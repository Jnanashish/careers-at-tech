/** @type {import('next').NextConfig} */

// Response headers applied to every route. Deliberately no CSP: the page pulls
// AdSense, Clarity and inline JSON-LD, so a meaningful policy needs nonces and a
// staged rollout — tracked separately rather than shipped half-broken.
// HSTS is intentionally absent too: the platform edge (Vercel) already sets it,
// and emitting a second Strict-Transport-Security header here would be noise.
const SECURITY_HEADERS = [
    // Stop MIME sniffing turning an uploaded/proxied asset into script.
    { key: "X-Content-Type-Options", value: "nosniff" },
    // Clickjacking: nothing here is meant to be embedded elsewhere.
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    // Send the full URL same-origin, origin-only cross-origin — keeps analytics
    // referrers useful without leaking query strings to apply-link destinations.
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    // No page needs these; deny them so an injected iframe can't ask either.
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
    reactStrictMode: false,
    // Don't advertise the framework/version in every response.
    poweredByHeader: false,
    // PostHog's API uses trailing-slash endpoints (/e/, /s/, /flags/). Without
    // this, Next 308-redirects them and event capture breaks. Side effect worth
    // knowing: Next no longer strips trailing slashes on normal routes either,
    // so /jobs/ serves instead of redirecting to /jobs — the self-referential
    // canonical in core/SEO/Meta.jsx is what keeps that from becoming a
    // duplicate-content problem.
    skipTrailingSlashRedirect: true,
    images: {
        // next/font is built-in (configured in _app.js) — the old
        // experimental.fontLoaders / @next/font block was legacy and a no-op.
        // remotePatterns is the modern, stricter replacement for the deprecated
        // images.domains allowlist.
        remotePatterns: [
            { protocol: "https", hostname: "res.cloudinary.com" },
            { protocol: "https", hostname: "i.ibb.co" },
        ],
        // AVIF first, WebP fallback. Company logos are the bulk of our image
        // bytes and re-encode very well.
        formats: ["image/avif", "image/webp"],
        // Logos are immutable once uploaded; 31d beats the 60s default and cuts
        // repeat optimization work.
        minimumCacheTTL: 2678400,
    },
    async headers() {
        return [{ source: "/:path*", headers: SECURITY_HEADERS }];
    },
    // PostHog reverse proxy. Serving ingestion from our own origin keeps the
    // ~15-25% of visitors running content blockers in the data. Order matters:
    // the two asset rules must precede the catch-all, and the asset host is a
    // different origin from the API host (it returns cache-control headers the
    // API host strips). Cost note: this traffic — including session replay —
    // now counts against Vercel Fast Data Transfer.
    async rewrites() {
        return [
            {
                source: "/ingest/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/ingest/array/:path*",
                destination: "https://us-assets.i.posthog.com/array/:path*",
            },
            {
                source: "/ingest/:path*",
                destination: "https://us.i.posthog.com/:path*",
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/toolkit",
                destination: "/resume-prompts",
                permanent: true,
            },
            {
                source: "/toolkit/:slug",
                destination: "/resume-prompts/:slug",
                permanent: true,
            },
            {
                // Homepage is /jobs. This used to be a getServerSideProps redirect
                // in pages/index.jsx, which woke a serverless function for every
                // single hit on "/". Handled at the edge now — same 308, no compute.
                source: "/",
                destination: "/jobs",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
