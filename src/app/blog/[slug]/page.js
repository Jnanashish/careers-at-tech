import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { getBlogBySlug } from "@/lib/blog-api";
import BlogContent from "../../_components/BlogContent";
import Breadcrumbs from "../../_components/Breadcrumbs";
import TableOfContents from "../../_components/TableOfContents";
import ShareButtons from "../../_components/ShareButtons";
import AuthorCard from "../../_components/AuthorCard";
import RelatedPosts from "../../_components/RelatedPosts";
import NewsletterForm from "../../_components/NewsletterForm";
import BlogPostingSchema from "../../_components/json-ld/BlogPostingSchema";
import BreadcrumbSchema from "../../_components/json-ld/BreadcrumbSchema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";

function extractHeadings(html) {
  if (!html) return [];
  const regex = /<h([2-4])\s[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-4]>/gi;
  const headings = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ""),
    });
  }
  return headings;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const canonical = post.seo?.canonicalUrl || `/blog/${slug}`;
  const ogImage = post.seo?.ogImage || post.coverImage?.url;

  return {
    title: `${title} | Careers at Tech`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      siteName: "Careers at Tech",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : [],
      tags: post.tags?.map((t) => t.name),
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: {
      canonical,
    },
    ...(post.seo?.noindex && {
      robots: { index: false, follow: true },
    }),
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.contentHtml);
  const postUrl = `${SITE_URL}/blog/${slug}`;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(post.category
      ? [
          {
            label: post.category.name,
            href: `/blog/category/${post.category.slug}`,
          },
        ]
      : []),
    { label: post.title },
  ];

  const date = new Date(post.publishedAt);
  const formattedDate = post.publishedAt && !isNaN(date)
    ? date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <BlogPostingSchema post={post} />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="px-6 lg:px-20 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-8 max-w-3xl">
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="inline-block rounded-full bg-blue-bg text-primary text-xs font-medium px-3 py-1 mb-4 hover:bg-primary hover:text-white transition-colors"
            >
              {post.category.name}
            </Link>
          )}

          <h1 className="text-3xl lg:text-4xl font-bold text-[#121212] leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[#697586]">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar && (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="font-medium">{post.author.name}</span>
              </div>
            )}
            {formattedDate && <span>{formattedDate}</span>}
            {post.readingTime && <span>{post.readingTime} min read</span>}
            {post.viewCount != null && (
              <span>{post.viewCount.toLocaleString()} views</span>
            )}
          </div>
        </header>

        {post.coverImage?.url && (
          <div className="relative aspect-[21/9] rounded-[14px] overflow-hidden mb-10 max-w-5xl">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
              priority
              {...(post.coverImage.blurhash && {
                placeholder: "blur",
                blurDataURL: post.coverImage.blurhash,
              })}
            />
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10 max-w-5xl">
          <div className="lg:order-1">
            <TableOfContents headings={headings} />
          </div>

          <div className="lg:order-2">
            <BlogContent contentHtml={post.contentHtml} />

            {post.tags?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-grey-border">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/blog/tag/${tag.slug}`}
                      className="rounded-full bg-blue-bg text-primary text-xs font-medium px-3 py-1 hover:bg-primary hover:text-white transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-grey-border">
              <ShareButtons url={postUrl} title={post.title} />
            </div>

            <div className="mt-8">
              <AuthorCard author={post.author} />
            </div>
          </div>
        </div>

        <RelatedPosts posts={post.relatedPosts} />

        <section className="mt-12 pt-8 border-t border-grey-border max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#121212] mb-2">
            Stay Updated
          </h2>
          <p className="text-grey-light-text text-sm mb-6">
            Get the latest career tips and job updates delivered to your inbox.
          </p>
          <NewsletterForm />
        </section>
      </div>
    </>
  );
}
