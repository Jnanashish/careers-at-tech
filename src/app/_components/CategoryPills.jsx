import Link from "next/link";

const CategoryPills = ({ categories, activeCategory }) => {
  if (!categories?.length) return null;

  return (
    <nav aria-label="Blog categories" className="mb-8">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Link
          href="/blog"
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-primary text-white"
              : "bg-blue-bg text-primary hover:bg-primary hover:text-white"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.slug
                ? "bg-primary text-white"
                : "bg-blue-bg text-primary hover:bg-primary hover:text-white"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default CategoryPills;
