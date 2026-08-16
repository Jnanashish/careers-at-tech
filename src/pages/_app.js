import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Inter, Instrument_Serif, JetBrains_Mono, Fraunces } from "next/font/google";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { trackPageView } from "@/core/eventHandler";
import "../styles/globals.css";

// Primary UI font. Only the weights actually mapped by Tailwind's font-* utilities
// (400/500/600/700) are loaded — 300/800 were unused dead weight.
const inter = Inter({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

const instrumentSerif = Instrument_Serif({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-instrument-serif",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

const fraunces = Fraunces({
    weight: ["400", "500"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-fraunces",
    display: "swap",
});

const App = (props) => {
    const { Component, pageProps } = props;
    const router = useRouter();

    // Track SPA navigations as GA4 page_view events. The initial hard load is
    // auto-collected by Firebase; this covers client-side route changes only.
    useEffect(() => {
        const handleRouteChange = (url) => trackPageView(url);
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => router.events.off("routeChangeComplete", handleRouteChange);
    }, [router.events]);

    return (
        <>
            {/* Global viewport — lives in _app so every page gets it exactly once
                (Pages Router does not inject a default). Per-page <Head> handles SEO meta. */}
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* ms clarity integration  */}
            <Script strategy="lazyOnload" id="ms-clarity">
                {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "iibx8wd1xz");`}
            </Script>

            <ErrorBoundary>
                {/* Font-variable carrier only. This used to be a <main>, which
                    nested every page's own <main id="main-content"> inside a
                    second one — invalid HTML, and it broke the single-main
                    landmark that the "Skip to content" link targets. */}
                <div className={`${inter.className} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}>
                    <Component {...pageProps} />
                </div>
            </ErrorBoundary>

            <SpeedInsights />
        </>
    );
};

export default App;
