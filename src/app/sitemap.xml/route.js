import { getSitemapData } from "@/lib/blog-api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";

function escapeXml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const sitemapData = await getSitemapData();
  const blogPosts = sitemapData?.data || [];

  const staticRoutes = [
    { url: "/", changefreq: "daily", priority: "1.0" },
    { url: "/jobs", changefreq: "hourly", priority: "0.9" },
    { url: "/blog", changefreq: "daily", priority: "0.8" },
    { url: "/career-pages", changefreq: "weekly", priority: "0.6" },
    { url: "/contact", changefreq: "monthly", priority: "0.4" },
    { url: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
    { url: "/terms-and-conditions", changefreq: "yearly", priority: "0.3" },
    { url: "/dmca", changefreq: "yearly", priority: "0.3" },
  ];

  const staticEntries = staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${escapeXml(SITE_URL + route.url)}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("");

  const blogEntries = blogPosts
    .map(
      (post) => `
  <url>
    <loc>${escapeXml(`${SITE_URL}/blog/${post.slug}`)}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticEntries}
  ${blogEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
