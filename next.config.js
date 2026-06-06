/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // next/font is built-in (configured in _app.js) — the old
        // experimental.fontLoaders / @next/font block was legacy and a no-op.
        // remotePatterns is the modern, stricter replacement for the deprecated
        // images.domains allowlist.
        remotePatterns: [
            { protocol: "https", hostname: "res.cloudinary.com" },
            { protocol: "https", hostname: "i.ibb.co" },
        ],
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
        ];
    },
};

module.exports = nextConfig;
