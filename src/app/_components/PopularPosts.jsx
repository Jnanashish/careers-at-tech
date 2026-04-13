import Link from "next/link";

const PopularPosts = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-[#121212] mb-4">
        Popular Posts
      </h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id}>
            <Link
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <p className="text-sm font-medium text-grey-text group-hover:text-primary transition-colors leading-snug line-clamp-2">
                {post.title}
              </p>
              {post.readingTime ? (
                <p className="text-xs text-[#697586] mt-1">
                  {post.readingTime} min read
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPosts;
