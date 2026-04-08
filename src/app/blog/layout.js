import BlogHeader from "../_components/BlogHeader";
import BlogFooter from "../_components/BlogFooter";

export default function BlogLayout({ children }) {
  return (
    <div className="blog-root">
      <a
        href="#blog-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <BlogHeader />
      <main id="blog-content">{children}</main>
      <BlogFooter />
    </div>
  );
}
