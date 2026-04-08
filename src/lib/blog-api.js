const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const blogFetch = async (path, options = {}) => {
  const url = `${API}${path}`;
  const res = await fetch(url, {
    next: { revalidate: 60, tags: ["blogs"] },
    ...options,
  });
  if (!res.ok) return null;
  return res.json();
};

export async function getBlogs({ page = 1, limit = 12, category, tag } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (category) params.set("category", category);
  if (tag) params.set("tag", tag);
  return blogFetch(`/api/blogs?${params}`);
}

export async function getBlogBySlug(slug) {
  return blogFetch(`/api/blogs/${slug}`);
}

export async function getCategories() {
  return blogFetch("/api/blogs/categories");
}

export async function getTags() {
  return blogFetch("/api/blogs/tags");
}

export async function searchBlogs(query, page = 1, limit = 12) {
  const params = new URLSearchParams({ q: query, page, limit });
  return blogFetch(`/api/blogs/search?${params}`);
}

export async function getPopularPosts(limit = 5) {
  return blogFetch(`/api/blogs/popular?limit=${limit}`);
}

export async function getSitemapData() {
  return blogFetch("/api/blogs/sitemap");
}
