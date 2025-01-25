import Head from "next/head";
import { generateSlugFromrole } from "@/Helpers/jobdetailshelper";

const JobDescriptionMeta = ({ data }) => {
    const generateTitle = () => {
        return `${data?.role} job - ${data?.companyName} hiring in ${data?.location}`;
    };

    const generateDescription = () => {
        if (data?.jobtype === "Internship") {
            return `${data?.companyName} is hiring freshers for a ${data?.role} role. Intenship opportunity at ${data?.location} location`;
        }
        if (data?.experience === "Freshers") {
            return `${data?.companyName} is hiring Freshers for a ${data?.role} role. Full time job opportunity in ${data?.location} location`;
        }
        return `${data?.companyName} is hiring candidates with ${data?.experience} of experience for a ${data?.role} role. Full time job opportunity in ${data?.location} ${
            data?.location === "Multiple locations." ? data?.location : `${data?.location} location.`
        }`;
    };

    const generateKeywords = () => {
        let words = "";
        words = words + `${data?.companyName} hiring, ` + `${data?.jobtype} jobs, ` + `${data?.role}, ` + `jobs in ${data?.location}`;
        return words;
    };

    const generateCanonicalUrl = () => {
        const titleforShare = generateSlugFromrole(data?.title);
        return `https://careersat.tech/${titleforShare}/${data?._id}`;
    };

    return (
        <Head>
            <title>{generateTitle()}</title>
            <meta property="og:title" content={generateTitle()} />

            <meta name="description" content={generateDescription()} />
            <meta property="og:description" content={generateDescription()} />

            <meta name="keywords" content={generateKeywords()} />

            {/* The viewport meta tag is defined twice; keeping only one instance */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#0069ff" />
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={generateCanonicalUrl()} />

            <meta property="og:locale" content="en_US" />
            <meta property="og:url" content={generateCanonicalUrl()} />
            <meta property="og:site_name" content="Careers at Tech" />
            {!!data?.imagePath && <meta property="og:image" content={data?.imagePath} />}
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="400" />
            <meta property="og:image:height" content="400" />
        </Head>
    );
};
export default JobDescriptionMeta;
