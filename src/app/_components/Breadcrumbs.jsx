import Link from "next/link";

const Breadcrumbs = ({ items }) => {
  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-[#697586]">
        {items.map((item, index) => (
          <li key={item.href || index} className="flex items-center gap-1">
            {index > 0 && (
              <span aria-hidden="true" className="mx-1">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-grey-text font-medium truncate max-w-[200px] lg:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
