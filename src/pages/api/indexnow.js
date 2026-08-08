// POST /api/indexnow — push job URLs to IndexNow the moment they change.
//
// The backend owns the publish/delete events but not the domain, and IndexNow
// proves ownership with a key file served from this host. Rather than copy the
// key into the backend, the backend calls this route and we hold the key here.
//
// Auth: Bearer INDEXNOW_SUBMIT_TOKEN. Without it this would be an open relay —
// anyone could burn our submission quota and get the domain rate-limited by Bing.
//
//   curl -X POST https://careersat.tech/api/indexnow \
//     -H "Authorization: Bearer $INDEXNOW_SUBMIT_TOKEN" \
//     -H "Content-Type: application/json" \
//     -d '{"slugs":["acme-frontend-engineer-ab12cd"]}'
//
// Send `slugs` for job URLs, or `urls` for absolute URLs on this host. Off-host
// and malformed entries are dropped, not rejected — one bad row shouldn't lose
// the rest of the batch. Deletes use the same call: IndexNow has no delete verb,
// so we resubmit the dead URL and the engine drops it once it recrawls a 404.

import { timingSafeEqual } from "crypto";
import { submitToIndexNow, jobUrlsFromSlugs } from "@/core/SEO/indexnow";

// Generous enough for a full backfill, low enough that a leaked token can't be
// used to hammer the endpoint with megabyte payloads.
const MAX_URLS_PER_CALL = 1000;

function tokenMatches(provided) {
    const expected = process.env.INDEXNOW_SUBMIT_TOKEN;
    if (!expected || !provided) return false;
    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    // timingSafeEqual throws on length mismatch, so guard first. The length of
    // the expected token is not itself a secret.
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "method not allowed" });
    }

    if (!process.env.INDEXNOW_SUBMIT_TOKEN) {
        return res.status(503).json({ error: "INDEXNOW_SUBMIT_TOKEN not configured" });
    }

    const auth = req.headers.authorization || "";
    const provided = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!tokenMatches(provided)) {
        return res.status(401).json({ error: "unauthorized" });
    }

    const body = typeof req.body === "string" ? safeParse(req.body) : req.body;
    if (!body || typeof body !== "object") {
        return res.status(400).json({ error: "expected a JSON object body" });
    }

    const fromSlugs = jobUrlsFromSlugs(body.slugs);
    const fromUrls = Array.isArray(body.urls) ? body.urls : [];
    const urls = [...fromSlugs, ...fromUrls];

    if (urls.length === 0) {
        return res.status(400).json({ error: "provide a non-empty `slugs` or `urls` array" });
    }
    if (urls.length > MAX_URLS_PER_CALL) {
        return res.status(413).json({ error: `at most ${MAX_URLS_PER_CALL} URLs per call` });
    }

    const result = await submitToIndexNow(urls);
    // submitToIndexNow never throws; a failed ping is reported, not raised, so the
    // caller can log it without treating it as a failed publish.
    return res.status(result.ok ? 200 : 502).json(result);
}

function safeParse(s) {
    try {
        return JSON.parse(s);
    } catch {
        return null;
    }
}
