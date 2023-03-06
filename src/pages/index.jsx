import React from "react";
import Head from "next/head";
import HomePage from "./home";
const Home = () => {
    return (
        <>
            <Head>
                <title>Careers at Tech</title>
                <meta name="description" content="One place solution to get regular Internship and Job Updates." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomePage />
        </>
    );
};
export default Home;
