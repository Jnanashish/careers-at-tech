import Link from "next/link";
import PopularPosts from "./PopularPosts";
import NewsletterForm from "./NewsletterForm";

const Sidebar = ({ popularPosts, categories }) => {
  return (
    <aside aria-label="Blog sidebar" className="space-y-8">
      <PopularPosts posts={popularPosts} />

      {categories?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-[#121212] mb-4">
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/blog/category/${cat.slug}`}
                  className="flex items-center justify-between text-sm text-grey-light-text hover:text-primary transition-colors py-1"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-[#697586] bg-blue-bg rounded-full px-2 py-0.5">
                    {cat.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-[14px] border border-grey-border bg-blue-bg p-6">
        <h3 className="text-lg font-semibold text-[#121212] mb-2">
          Newsletter
        </h3>
        <p className="text-sm text-grey-light-text mb-4">
          Get the latest career tips and job updates delivered to your inbox.
        </p>
        <NewsletterForm />
      </div>
    </aside>
  );
};

export default Sidebar;
