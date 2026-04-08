import Image from "next/image";
import Link from "next/link";

const FeaturedPost = ({ post }) => {
  if (!post) return null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="rounded-[14px] border border-grey-border bg-white overflow-hidden transition-all duration-300 hover:border-primary-light hover:shadow-lg lg:grid lg:grid-cols-2 lg:gap-0">
        {post.coverImage?.url && (
          <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[320px] overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        )}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          {post.category && (
            <span className="inline-block w-fit rounded-full bg-blue-bg text-primary text-xs font-medium px-3 py-1 mb-3">
              {post.category.name}
            </span>
          )}
          <h2 className="text-2xl lg:text-3xl font-bold text-[#121212] leading-tight mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-grey-light-text text-base leading-relaxed mb-5 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-[#697586]">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar && (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                )}
                <span className="font-medium">{post.author.name}</span>
              </div>
            )}
            <span>{formattedDate}</span>
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedPost;
