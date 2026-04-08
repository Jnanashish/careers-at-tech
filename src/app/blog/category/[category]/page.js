import { notFound } from "next/navigation";
import Link from "next/link";

import { getBlogs, getCategories } from "@/lib/blog-api";
import BlogCard from "../../../_components/BlogCard";
import CategoryPills from "../../../_components/CategoryPills";
import BlogPagination from "../../../_components/BlogPagination";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import BreadcrumbSchema from "../../../_components/json-ld/BreadcrumbSchema";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const formatted = decoded
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formatted} Articles | Careers at Tech Blog`,
    description: `Browse all ${formatted.toLowerCase()} articles and resources on the Careers at Tech blog.`,
    openGraph: {
      title: `${formatted} Articles | Careers at Tech Blog`,
      description: `Browse all ${formatted.toLowerCase()} articles.`,
      type: "website",
      url: `/blog/category/${category}`,
    },
    alternates: {
      canonical: `/blog/category/${category}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const [blogsData, categoriesData] = await Promise.all([
    getBlogs({ page: 1, limit: 12, category }),
    getCategories(),
  ]);

  const posts = blogsData?.data || [];
  const categories = categoriesData?.data || [];
  const totalPages = blogsData?.totalPages || 1;

  const currentCategory = categories.find((c) => c.slug === category);
  const categoryName = currentCategory?.name || decodeURIComponent(category);

  if (posts.length === 0 && !currentCategory) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: categoryName },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="px-6 lg:px-20 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-3xl font-bold text-[#121212] mb-6">
          {categoryName}
        </h1>

        <CategoryPills categories={categories} activeCategory={category} />

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-grey-light-text text-center py-12">
            No posts found in this category.
          </p>
        )}

        <BlogPagination
          initialPage={1}
          totalPages={totalPages}
          category={category}
        />
      </div>
    </>
  );
}
