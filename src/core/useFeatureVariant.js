import { useEffect, useRef, useState } from "react";

import { initPostHog, onFeatureFlags } from "./posthog";

// React binding for PostHog feature flags / experiments.
//
// We do not use @posthog/react: its provider needs a client instance at first
// render, which would force posthog-js (~80KB gz) into the shared _app chunk.
// These hooks read the same flags off the lazily-loaded client instead.
//
// IMPORTANT for A/B tests: flags resolve after the SDK loads (~1-2s), so a
// variant applied to above-the-fold UI will visibly swap. Either render the
// control until `loaded` is true and only then swap, or run experiments on
// below-the-fold / post-interaction UI. Flag values are cached in localStorage,
// so this only affects a visitor's very first pageview.

/**
 * Read a multivariate feature flag (this is what experiments use).
 *
 * Reading the flag emits `$feature_flag_called`, which is how PostHog records
 * exposure — call this only where the user can actually see the variant, or
 * the experiment's exposure numbers will be wrong.
 *
 * @param {string} flagKey  Flag key from the PostHog experiment
 * @param {string} fallback Value used before flags load / when PostHog is off
 * @returns {{ variant: string|boolean|undefined, loaded: boolean }}
 */
export const useFeatureVariant = (flagKey, fallback = "control") => {
    const [state, setState] = useState({ variant: fallback, loaded: false });

    // Keep the fallback out of the effect deps so an inline literal doesn't
    // re-subscribe on every render.
    const fallbackRef = useRef(fallback);
    fallbackRef.current = fallback;

    useEffect(() => {
        if (!flagKey) return undefined;
        let active = true;

        const read = () => {
            if (!active) return;
            initPostHog().then((instance) => {
                if (!active) return;
                const value = instance ? instance.getFeatureFlag(flagKey) : undefined;
                setState({ variant: value === undefined ? fallbackRef.current : value, loaded: true });
            });
        };

        const unsubscribe = onFeatureFlags(read);

        return () => {
            active = false;
            unsubscribe();
        };
    }, [flagKey]);

    return state;
};

/**
 * Boolean convenience wrapper over useFeatureVariant. `enabled` is the
 * fallback until flags load, so gate net-new UI on `true` only.
 *
 * @param {string} flagKey
 * @param {boolean} fallback
 * @returns {{ enabled: boolean, loaded: boolean }}
 */
export const useFeatureEnabled = (flagKey, fallback = false) => {
    const { variant, loaded } = useFeatureVariant(flagKey, fallback);
    return { enabled: variant === true || (typeof variant === "string" && variant !== "control"), loaded };
};
