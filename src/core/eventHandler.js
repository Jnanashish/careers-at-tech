import { getAnalytics, isSupported, logEvent, setUserId } from "firebase/analytics";
import { app } from "./firebaseConfig";

// Firebase Analytics (GA4) is only available in the browser, and only in
// environments that support it (cookies enabled, not SSR, supported browser).
// We init lazily behind isSupported() so an unsupported environment never throws.
let analytics = null;
let analyticsReady = null;

const initAnalytics = () => {
    if (typeof window === "undefined") return Promise.resolve(null);
    if (analyticsReady) return analyticsReady;

    analyticsReady = isSupported()
        .then((supported) => {
            if (!supported) return null;
            analytics = getAnalytics(app);
            const userId = localStorage.getItem("userId");
            if (userId) setUserId(analytics, userId);
            return analytics;
        })
        .catch(() => null);

    return analyticsReady;
};

// Kick off init on the client as soon as the module loads.
if (typeof window !== "undefined") initAnalytics();

/**
 * Log a custom GA4 event. Safe to call anywhere — no-ops on the server and
 * when analytics is unsupported/uninitialised.
 */
export const firebaseEventHandler = (eventName, eventAttributes = {}) => {
    if (typeof window === "undefined" || !eventName) return;
    initAnalytics().then((a) => {
        if (a) logEvent(a, eventName, eventAttributes);
    });
};

/**
 * Log a SPA page view. Firebase auto-collects page_view on the initial hard
 * load; this fires it for client-side route changes (Next.js Pages Router
 * navigations) which Firebase does not capture automatically.
 */
export const trackPageView = (url) => {
    if (typeof window === "undefined") return;
    firebaseEventHandler("page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
    });
};
