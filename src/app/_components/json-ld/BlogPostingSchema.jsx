const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";

const safeJsonLd = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

const BlogPostingSchema = ({ post }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.coverImage?.url ? [post.coverImage.url] : [],
    ...(post.author?.name && {
      author: {
        "@type": "Person",
        name: post.author.name,
        ...(post.author.avatar && { image: post.author.avatar }),
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "CareersAt.Tech",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    description: post.excerpt,
    keywords: post.tags?.map((t) => t.name).join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
};

export default BlogPostingSchema;
