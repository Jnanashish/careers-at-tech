import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";

const Home = () => {
    // for now all routes are redirected to job listing page
    useEffect(() => {
        Router.push("/jobs");
    }, []);

    return (
        <>
            <Head>
                <title>Careers at Tech</title>
                <meta name="description" content="One place solution to get regular Internship and Job Updates." />
                <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 user-scalable=0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    );
};
export default Home;
