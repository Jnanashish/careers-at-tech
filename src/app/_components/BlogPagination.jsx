"use client";

import { useState, useTransition } from "react";
import BlogCard from "./BlogCard";

const BlogPagination = ({ initialPage, totalPages, category, tag }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    const nextPage = page + 1;
    startTransition(async () => {
      const params = new URLSearchParams({
        page: nextPage,
        limit: 12,
      });
      if (category) params.set("category", category);
      if (tag) params.set("tag", tag);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?${params}`
        );
        if (res.ok) {
          const data = await res.json();
          setPosts((prev) => [...prev, ...(data.data || [])]);
          setPage(nextPage);
        }
      } catch {
        // Silently fail — user can retry
      }
    });
  };

  const hasMore = page < totalPages;

  return (
    <>
      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={isPending}
            className="rounded-full border border-primary text-primary px-8 py-3 text-sm font-medium hover:bg-primary hover:text-white transition-colors disabled:opacity-60"
          >
            {isPending ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
};

export default BlogPagination;
