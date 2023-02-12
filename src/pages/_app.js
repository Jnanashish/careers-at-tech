import React from "react";
import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";

import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { Inter } from "@next/font/google";

// set up inter font for the project
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

const App = (props) => {
    const { Component, pageProps } = props;
    return (
        <Provider store={store}>
            <main className={inter.className}>
                <Component {...pageProps} />
                <Analytics />
            </main>
        </Provider>
    );
};

export default App;
