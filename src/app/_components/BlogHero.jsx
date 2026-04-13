import BlogSearchBar from "./BlogSearchBar";

const BlogHero = () => {
  return (
    <section className="bg-blue-bg py-12 lg:py-16 px-6 lg:px-20 mb-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#121212] mb-4">
          Blog
        </h1>
        <p className="text-grey-light-text text-base lg:text-lg mb-8">
          Insights, tips, and resources to accelerate your tech career
        </p>
        <BlogSearchBar />
      </div>
    </section>
  );
};

export default BlogHero;
