// PostHog — product analytics (funnels / feature adoption), session replay and
// feature flags + experiments (A/B tests).
//
// It sits alongside, not instead of, what was already here:
//   - Firebase GA4 (eventHandler.js) keeps acquisition + Search Console reporting
//   - Microsoft Clarity (_app.js) keeps heatmaps and rage-click, free and unmetered
//   - PostHog owns funnels, retention, replay-linked-to-events, and A/B tests
//
// posthog-js is ~80KB gzipped, so it is never allowed into the shared _app
// chunk. Everything below hides behind a dynamic import() that only runs in the
// browser once the main thread is idle — the same pattern eventHandler.js uses
// for firebase. Consequence: the SDK (and therefore autocapture) starts ~1-2s
// after first paint, so the first few clicks of a session are not autocaptured.
// Explicit capture() calls are queued, not lost — see posthogCapture below.

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest";

// Where the SDK sends data (POSTHOG_HOST) and where the PostHog app itself
// lives are different once a reverse proxy is in play. ui_host is what the
// toolbar and "view recording" links point at.
const POSTHOG_UI_HOST = "https://us.posthog.com";

let client = null;
let clientReady = null;

// Local dev is off by default so localhost traffic doesn't pollute funnels or
// burn the 5K/mo replay quota. Set NEXT_PUBLIC_POSTHOG_ALLOW_LOCALHOST=true in
// .env.local when you actually want to verify the integration end to end.
const isDisabled = () => {
    if (typeof window === "undefined") return true;
    if (!POSTHOG_KEY) return true; // no token configured — hard no-op, never throws
    if (process.env.NEXT_PUBLIC_POSTHOG_ALLOW_LOCALHOST === "true") return false;
    const { hostname } = window.location;
    return hostname === "localhost" || hostname === "127.0.0.1";
};

/**
 * Load + init posthog-js. Idempotent — every caller shares one promise, which
 * resolves to the client, or to null when PostHog is disabled/unavailable.
 */
export const initPostHog = () => {
    if (isDisabled()) return Promise.resolve(null);
    if (clientReady) return clientReady;

    clientReady = (async () => {
        try {
            const { default: posthog } = await import("posthog-js");

            posthog.init(POSTHOG_KEY, {
                // Relative path — requests go to careersat.tech/ingest/* and are
                // rewritten to PostHog in next.config.js, so domain-based
                // trackers/adblockers don't eat the traffic.
                api_host: POSTHOG_HOST,
                ui_host: POSTHOG_UI_HOST,

                // Opt in to the current default behaviours rather than the
                // legacy ones. Bump this date deliberately, never casually —
                // it changes replay + rageclick + pageview defaults.
                defaults: "2026-06-25",

                // SPA pageviews are handled by the SDK's history listener, so
                // the Pages Router routeChangeComplete hook in _app.js stays
                // GA4-only. Do not also capture $pageview by hand.
                capture_pageview: "history_change",
                // ~1 extra event per pageview for marginal insight — Clarity
                // and GA4 both already report engagement/exit.
                capture_pageleave: false,

                // Autocapture is what makes "did anyone use this feature?"
                // answerable without instrumenting first. Kept on; the noisier
                // sub-captures are off to protect the 1M events/mo free tier.
                autocapture: true,
                capture_dead_clicks: false,
                capture_heatmaps: false, // Clarity already owns heatmaps
                disable_surveys: true, // not used; skips an extra config fetch

                // No auth on this site, so every visitor is anonymous. Anonymous
                // events still support trends, funnels and experiments — they
                // only lose cohorts/lifecycle/person-property filters, and they
                // bill cheaper. Flip to "always" if accounts ever ship.
                person_profiles: "identified_only",
                persistence: "localStorage+cookie",

                session_recording: {
                    // 20% of sessions. 5K recordings/mo is the free ceiling and
                    // the first thing a traffic spike blows through.
                    sampleRate: 0.2,
                    maskAllInputs: true,
                },
            });

            client = posthog;
            return client;
        } catch {
            return null;
        }
    })();

    return clientReady;
};

// Kick off on the client once the main thread is free. Falls back to a
// macrotask where requestIdleCallback is unavailable (Safari < 16.4).
if (typeof window !== "undefined") {
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    schedule(() => initPostHog());
}

/**
 * Capture a custom event. Safe anywhere — no-ops on the server and when
 * PostHog is disabled. Calls made before the SDK finishes loading are queued
 * behind the init promise, not dropped.
 */
export const posthogCapture = (eventName, properties = {}) => {
    if (typeof window === "undefined" || !eventName) return;
    initPostHog().then((ph) => {
        if (ph) ph.capture(eventName, properties);
    });
};

/**
 * Attach an identity to the current person. Only meaningful once there is a
 * real user id to attach — calling it also promotes the session from anonymous
 * to identified, which enables cohorts but costs more per event.
 */
export const posthogIdentify = (distinctId, properties = {}) => {
    if (typeof window === "undefined" || !distinctId) return;
    initPostHog().then((ph) => {
        if (ph) ph.identify(distinctId, properties);
    });
};

/**
 * Subscribe to feature flag loads. The callback fires as soon as flags are
 * available and again whenever they are re-evaluated. Returns an unsubscribe
 * function (a no-op if PostHog is disabled).
 */
export const onFeatureFlags = (callback) => {
    let unsubscribe = null;
    let cancelled = false;

    initPostHog().then((ph) => {
        if (!ph || cancelled) return;
        unsubscribe = ph.onFeatureFlags(callback);
    });

    return () => {
        cancelled = true;
        if (unsubscribe) unsubscribe();
    };
};

export const getPostHog = () => client;
