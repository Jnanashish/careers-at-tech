import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ post }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="rounded-[14px] border border-grey-border bg-white overflow-hidden transition-all duration-300 hover:border-primary-light hover:shadow-lg">
        {post.coverImage?.url && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          {post.category && (
            <span className="inline-block rounded-full bg-blue-bg text-primary text-xs font-medium px-3 py-1 mb-3">
              {post.category.name}
            </span>
          )}
          <h3 className="text-lg font-semibold text-[#121212] leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-grey-light-text text-sm leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-[#697586]">
            <span>{formattedDate}</span>
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
