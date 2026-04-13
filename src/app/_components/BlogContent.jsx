import parse from "html-react-parser";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_IMAGE_PATTERN = /^https:\/\/res\.cloudinary\.com\//;

const replaceOptions = {
  replace: (domNode) => {
    if (domNode.name === "img") {
      const { src, alt, width, height } = domNode.attribs || {};
      if (!src) return null;

      const isAllowedRemote = ALLOWED_IMAGE_PATTERN.test(src);
      const isLocal = src.startsWith("/");
      if (!isAllowedRemote && !isLocal) {
        return (
          // eslint-disable-next-line @next/next/no-img-element -- intentional fallback for non-whitelisted domains
          <img src={src} alt={alt || ""} className="rounded-lg my-6" loading="lazy" />
        );
      }

      return (
        <Image
          src={src}
          alt={alt || ""}
          width={parseInt(width, 10) || 800}
          height={parseInt(height, 10) || 450}
          className="rounded-lg my-6"
          sizes="(max-width: 768px) 100vw, 720px"
          loading="lazy"
        />
      );
    }
  },
};

const BlogContent = ({ contentHtml }) => {
  if (!contentHtml) return null;

  const sanitizedHtml = DOMPurify.sanitize(contentHtml);

  return (
    <article className="prose prose-lg max-w-none">
      {parse(sanitizedHtml, replaceOptions)}
    </article>
  );
};

export default BlogContent;
