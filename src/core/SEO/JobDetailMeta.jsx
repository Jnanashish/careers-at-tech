import Head from "next/head";
import { generateSlugFromrole } from "@/Helpers/jobdetailshelper";
import { DEFAULT_COMPANY_LOGO } from "@/Helpers/config";

const stripHtml = (html) => {
  if (!html || html === "N") return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
};

const mapJobType = (type) => {
  if (!type || type === "N") return "FULL_TIME";
  const t = type.toLowerCase().trim();
  if (t === "internship" || t === "intern") return "INTERN";
  if (t === "contract") return "CONTRACTOR";
  return "FULL_TIME";
};

const JobDetailMeta = ({ data }) => {
  if (!data) return null;

  const role = data.role && data.role !== "N" ? data.role : data.title;
  const companyName = data.companyName || "Company";
  const location = data.location && data.location !== "N" ? data.location : "India";

  const title = `${role} at ${companyName} — CareersAt.Tech`;
  const descriptionParts = [];
  if (companyName) descriptionParts.push(`${companyName} is hiring`);
  if (data.experience === "Freshers") descriptionParts.push("freshers");
  descriptionParts.push(`for a ${role} role`);
  if (data.salary && data.salary !== "N" && !data.salary.includes("0LPA"))
    descriptionParts.push(`(${data.salary})`);
  descriptionParts.push(`in ${location}.`);
  descriptionParts.push("Apply now on CareersAt.Tech");
  const description = descriptionParts.join(" ");

  const keywords = [
    `${companyName} hiring`,
    `${data.jobtype || "Full Time"} jobs`,
    role,
    `jobs in ${location}`,
    "freshers jobs",
    "tech jobs India",
  ].join(", ");

  const titleSlug = generateSlugFromrole(data.title);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${titleSlug}/${data._id}`;

  const companyLogo = data.company?.smallLogo || data.imagePath || DEFAULT_COMPANY_LOGO;

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role,
    description: stripHtml(data.jobdesc) || description,
    datePosted: data.createdAt,
    employmentType: mapJobType(data.jobtype),
    hiringOrganization: {
      "@type": "Organization",
      name: companyName,
      logo: companyLogo,
    },
    ...(location !== "India" && {
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: location,
          addressCountry: "IN",
        },
      },
    }),
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563EB" />
      <meta charSet="UTF-8" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="CareersAt.Tech" />
      <meta property="og:locale" content="en_IN" />
      {companyLogo && <meta property="og:image" content={companyLogo} />}
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {companyLogo && <meta name="twitter:image" content={companyLogo} />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
    </Head>
  );
};

export default JobDetailMeta;
