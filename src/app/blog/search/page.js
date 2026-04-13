import Link from "next/link";

import { searchBlogs } from "@/lib/blog-api";
import BlogCard from "../../_components/BlogCard";
import BlogSearchBar from "../../_components/BlogSearchBar";

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  const query = q || "";

  return {
    title: query
      ? `Search: "${query}" | Careers at Tech Blog`
      : "Search Blog | Careers at Tech",
    description: query
      ? `Search results for "${query}" on the Careers at Tech blog.`
      : "Search articles on the Careers at Tech blog.",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = q || "";

  const blogsData = query ? await searchBlogs(query, 1, 20) : null;
  const posts = blogsData?.data || [];

  return (
    <div className="px-6 lg:px-20 py-8">
      <div className="max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-[#121212] mb-6 text-center">
          Search Blog
        </h1>
        <BlogSearchBar initialQuery={query} />
      </div>

      {query && (
        <p className="text-sm text-[#697586] mb-6">
          {posts.length > 0
            ? `${posts.length} result${posts.length !== 1 ? "s" : ""} for "${query}"`
            : `No results found for "${query}"`}
        </p>
      )}

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-grey-light-text text-lg mb-4">
            No articles match your search.
          </p>
          <p className="text-sm text-[#697586]">
            Try different keywords or browse{" "}
            <Link href="/blog" className="text-primary hover:underline">
              all posts
            </Link>
            .
          </p>
        </div>
      ) : null}
    </div>
  );
}
