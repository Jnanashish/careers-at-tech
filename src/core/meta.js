import Head from "next/head";

const Meta = ({ jobTitle, logo, description = "" }) => {
    return (
        <Head>
            <title>{jobTitle}</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <meta name="theme-color" content="#0069ff" />
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:-1" />
            <link rel="canonical" href="https://careersat.tech/" />
            <meta property="og: locale" content="en_US" />
            <meta property="og:title" content={jobTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content="https://careersat.tech/" />
            <meta property="og:site_name" content="Careers at Tech" />
            {logo && <meta property="og:image" content={logo} />}
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="400" />
            <meta property="og:image:height" content="400" />
        </Head>
    );
};
export default Meta;
