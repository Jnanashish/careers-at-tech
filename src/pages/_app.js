import "../styles/globals.css";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { Inter } from "@next/font/google";
import { Open_Sans } from "@next/font/google";

// set up inter font for the project
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});
const openSans = Open_Sans({
    weight: ["300", "400", "500", "600", "700", "800"],
});

const App = (props) => {
    const { Component, pageProps } = props;
    return (
        <>
        <Script id="ms-clarity" type="text/javascript" dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "iibx8wd1xz");`
        }}>
        </Script>
        <Provider store={store}>
            <main className={`${inter.className} ${openSans.className}`}>
                <Component {...pageProps} />
                <Analytics />
            </main>
        </Provider>
        </>
    );
};

export default App;
