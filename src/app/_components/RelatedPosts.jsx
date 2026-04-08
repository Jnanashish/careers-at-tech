import BlogCard from "./BlogCard";

const RelatedPosts = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-grey-border">
      <h2 className="text-2xl font-bold text-[#121212] mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
