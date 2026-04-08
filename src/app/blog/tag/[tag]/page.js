import { notFound } from "next/navigation";

import { getBlogs } from "@/lib/blog-api";
import BlogCard from "../../../_components/BlogCard";
import BlogPagination from "../../../_components/BlogPagination";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import BreadcrumbSchema from "../../../_components/json-ld/BreadcrumbSchema";

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const formatted = decoded
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `Posts tagged "${formatted}" | Careers at Tech Blog`,
    description: `All articles tagged with ${formatted.toLowerCase()} on the Careers at Tech blog.`,
    openGraph: {
      title: `Posts tagged "${formatted}" | Careers at Tech Blog`,
      description: `Articles tagged with ${formatted.toLowerCase()}.`,
      type: "website",
      url: `/blog/tag/${tag}`,
    },
    alternates: {
      canonical: `/blog/tag/${tag}`,
    },
  };
}

export default async function TagPage({ params }) {
  const { tag } = await params;
  const blogsData = await getBlogs({ page: 1, limit: 12, tag });

  const posts = blogsData?.data || [];
  const totalPages = blogsData?.totalPages || 1;

  const tagName = decodeURIComponent(tag)
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  if (posts.length === 0) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: `#${tagName}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="px-6 lg:px-20 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-3xl font-bold text-[#121212] mb-8">
          Posts tagged <span className="text-primary">#{tagName}</span>
        </h1>

        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}

        <BlogPagination initialPage={1} totalPages={totalPages} tag={tag} />
      </div>
    </>
  );
}
