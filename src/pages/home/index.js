import React, { useEffect } from "react";
import Router from "next/router";
import Header from "@/components/common/Header/header";

function HomePage() {
    useEffect(() => {
        Router.push("/jobs");
    }, []);
    return (
        <>
            <Header />
        </>
    );
}

export default HomePage;
