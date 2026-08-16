import Head from "next/head";

import { serializeJsonLd } from "./serializeJsonLd";

const JsonLd = ({ data }) => {
    if (!data) return null;
    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
            />
        </Head>
    );
};

export default JsonLd;
