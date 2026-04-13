const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";

const safeJsonLd = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

const BreadcrumbSchema = ({ items = [] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${SITE_URL}${item.href}` }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
};

export default BreadcrumbSchema;
