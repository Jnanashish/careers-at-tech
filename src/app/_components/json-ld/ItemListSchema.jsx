const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";

const ItemListSchema = ({ posts }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts?.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ItemListSchema;
