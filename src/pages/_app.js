import React from "react";
import Script from "next/script";

import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { Inter, Instrument_Serif, DM_Sans, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import "../styles/globals.css";

// set up inter font for the project
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-instrument-serif",
});

const dmSans = DM_Sans({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-dm-sans",
});

const bricolage = Bricolage_Grotesque({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-bricolage",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

const App = (props) => {
    const { Component, pageProps } = props;
    return (
        <>
            {/* ms clarity integration  */}
            <Script strategy="lazyOnload" id="ms-clarity">
                {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "iibx8wd1xz");`}
            </Script>

            <Provider store={store}>
                <ErrorBoundary>
                    <main className={`${inter.className} ${instrumentSerif.variable} ${dmSans.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}>
                        <Component {...pageProps} />
                    </main>
                </ErrorBoundary>
            </Provider>
        </>
    );
};

export default App;
