// Legacy 301 redirect shim. Old URL pattern was /:titleSlug/:mongoId.
// Resolves the legacy id to the new v2 slug and 301s to /jobs/:slug.
// On unresolvable id (backend by-id resolver currently broken / id never existed),
// returns 410 Gone — never 404 — so Google retires the URL from the index instead
// of treating it as a temporary miss.

import Link from "next/link";

import { fetchSlugByLegacyId } from "@/core/apis/v2/client";

const RESERVED_TOP_LEVEL = new Set([
    "jobs",
    "companies",
    "toolkit",
    "tools",
    "career-pages",
    "contact",
    "dmca",
    "privacy-policy",
    "terms-and-conditions",
    "api",
    "_next",
    "sitemap.xml",
    "robots.txt",
    "favicon.ico",
]);

function looksLikeMongoId(value) {
    return typeof value === "string" && /^[a-f0-9]{24}$/i.test(value);
}

export async function getServerSideProps({ params, res }) {
    const { jobtitle, id } = params || {};

    // Defensive: if a real top-level segment slipped through Next's routing,
    // bounce out so we don't accidentally shadow a real page.
    if (RESERVED_TOP_LEVEL.has(jobtitle)) {
        return { notFound: true };
    }

    // If the id doesn't look like a Mongo ObjectId, give up early — this likely
    // isn't a real legacy URL.
    if (!looksLikeMongoId(id)) {
        res.statusCode = 410;
        return { props: { gone: true, reason: "invalid_id" } };
    }

    let newSlug = null;
    try {
        newSlug = await fetchSlugByLegacyId(id);
    } catch {
        newSlug = null;
    }

    if (newSlug) {
        return {
            redirect: {
                destination: `/jobs/${encodeURIComponent(newSlug)}`,
                permanent: true,
            },
        };
    }

    res.statusCode = 410;
    return { props: { gone: true, reason: "not_resolved" } };
}

export default function LegacyJobRedirect() {
    // Renders only on the 410 path — the redirect path never reaches the component.
    return (
        <div style={{ padding: "4rem 1.5rem", maxWidth: 640, margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                This job posting is no longer available
            </h1>
            <p style={{ color: "#4b5563", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                The role you&apos;re looking for has been removed or expired. Browse current openings on CareersAt.Tech.
            </p>
            <Link
                href="/jobs"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#C75B3F",
                    color: "white",
                    fontWeight: 600,
                    padding: "0.75rem 1.5rem",
                    borderRadius: 8,
                    textDecoration: "none",
                }}
            >
                Browse all jobs →
            </Link>
        </div>
    );
}
