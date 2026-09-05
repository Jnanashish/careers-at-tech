// Firebase Analytics (GA4) is only available in the browser, and only in
// environments that support it (cookies enabled, not SSR, supported browser).
// We init lazily behind isSupported() so an unsupported environment never throws.
//
// Both the SDK and the app config are pulled in with dynamic import(). They used
// to be static imports, which put firebase/app + firebase/analytics in the shared
// _app chunk — parsed and executed before first paint on every route, purely to
// send analytics. Now they land in their own chunk.
//
// Init still happens on its own (getAnalytics is what emits the automatic
// first-load page_view, so waiting for a user event would lose it), just pushed
// past first paint via requestIdleCallback instead of racing hydration.

import { posthogCapture } from "./posthog";

let analytics = null;
let logEventFn = null;
let analyticsReady = null;

const initAnalytics = () => {
    if (typeof window === "undefined") return Promise.resolve(null);
    if (analyticsReady) return analyticsReady;

    analyticsReady = (async () => {
        try {
            const [firebaseAnalytics, { app }] = await Promise.all([
                import("firebase/analytics"),
                import("./firebaseConfig"),
            ]);
            const { getAnalytics, isSupported, setUserId, logEvent } = firebaseAnalytics;
            if (!(await isSupported())) return null;
            analytics = getAnalytics(app);
            logEventFn = logEvent;
            const userId = localStorage.getItem("userId");
            if (userId) setUserId(analytics, userId);
            return analytics;
        } catch {
            return null;
        }
    })();

    return analyticsReady;
};

// Kick off init on the client once the main thread is free. Falls back to a
// macrotask where requestIdleCallback is unavailable (Safari < 16.4).
if (typeof window !== "undefined") {
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    schedule(() => initAnalytics());
}

// GA4-only send. Kept separate from firebaseEventHandler because page views
// must not be mirrored to PostHog — posthog-js captures $pageview itself off
// history changes, so mirroring would double-count every SPA navigation.
const logGa4Event = (eventName, eventAttributes) => {
    initAnalytics().then((a) => {
        if (a && logEventFn) logEventFn(a, eventName, eventAttributes);
    });
};

/**
 * Log a custom product event. Fans out to both GA4 and PostHog so the ~19
 * existing call sites feed funnels/experiments without being rewritten. Safe
 * to call anywhere — no-ops on the server and when either SDK is unavailable.
 */
export const firebaseEventHandler = (eventName, eventAttributes = {}) => {
    if (typeof window === "undefined" || !eventName) return;
    logGa4Event(eventName, eventAttributes);
    posthogCapture(eventName, eventAttributes);
};

/**
 * Log a SPA page view. Firebase auto-collects page_view on the initial hard
 * load; this fires it for client-side route changes (Next.js Pages Router
 * navigations) which Firebase does not capture automatically. GA4 only — see
 * logGa4Event.
 */
export const trackPageView = (url) => {
    if (typeof window === "undefined") return;
    logGa4Event("page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
    });
};
