import parse, { domToReact } from "html-react-parser";
import Image from "next/image";

const replaceOptions = {
  replace: (domNode) => {
    if (domNode.name === "img") {
      const { src, alt, width, height } = domNode.attribs;
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

  return (
    <article className="prose prose-lg max-w-none">
      {parse(contentHtml, replaceOptions)}
    </article>
  );
};

export default BlogContent;
