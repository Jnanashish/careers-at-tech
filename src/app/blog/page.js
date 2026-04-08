import { getBlogs, getCategories, getPopularPosts } from "@/lib/blog-api";
import BlogHero from "../_components/BlogHero";
import CategoryPills from "../_components/CategoryPills";
import FeaturedPost from "../_components/FeaturedPost";
import BlogCard from "../_components/BlogCard";
import BlogPagination from "../_components/BlogPagination";
import Sidebar from "../_components/Sidebar";
import WebSiteSchema from "../_components/json-ld/WebSiteSchema";
import ItemListSchema from "../_components/json-ld/ItemListSchema";

export const metadata = {
  title: "Blog | Careers at Tech",
  description:
    "Insights, tips, and resources to accelerate your tech career. Read the latest articles on job hunting, interview preparation, and career growth.",
  openGraph: {
    title: "Blog | Careers at Tech",
    description:
      "Insights, tips, and resources to accelerate your tech career.",
    type: "website",
    url: "/blog",
    siteName: "Careers at Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Careers at Tech",
    description:
      "Insights, tips, and resources to accelerate your tech career.",
  },
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default async function BlogPage() {
  const [blogsData, categoriesData, popularData] = await Promise.all([
    getBlogs({ page: 1, limit: 12 }),
    getCategories(),
    getPopularPosts(5),
  ]);

  const posts = blogsData?.data || [];
  const categories = categoriesData?.data || [];
  const popularPosts = popularData?.data || [];
  const totalPages = blogsData?.totalPages || 1;

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      <WebSiteSchema />
      {posts.length > 0 && <ItemListSchema posts={posts} />}

      <BlogHero />

      <div className="px-6 lg:px-20 pb-16">
        <CategoryPills categories={categories} />

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
          <div>
            {featuredPost && (
              <div className="mb-8">
                <FeaturedPost post={featuredPost} />
              </div>
            )}

            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {remainingPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            )}

            <BlogPagination initialPage={1} totalPages={totalPages} />
          </div>

          <div className="hidden lg:block">
            <Sidebar
              popularPosts={popularPosts}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </>
  );
}
