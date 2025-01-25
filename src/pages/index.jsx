import React, { useEffect } from "react";
import Router from "next/router";
import Meta from "../core/SEO/Meta.jsx";

const Home = () => {
    // for now all routes are redirected to job listing page
    useEffect(() => {
        Router.push("/jobs");
    }, []);

    return (
        <>
            <Meta/>
        </>
    );
};
export default Home;
