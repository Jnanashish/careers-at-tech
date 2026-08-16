// Shared SEO constants. Previously each page redeclared SITE_URL and its own
// DEFAULT_OG_IMAGE, and two of them pointed at /og/default.png — a file that has
// never existed in public/, so every job and company page without a company logo
// shipped an og:image 404 and rendered a blank social card.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech").replace(/\/$/, "");

// Real, reachable asset. Square (400x400), so pages that fall back to it should
// pair it with twitter:card="summary", not "summary_large_image".
export const DEFAULT_OG_IMAGE =
    "https://res.cloudinary.com/dvc6fw5as/image/upload/v1737812575/IMG_7793_vq6qwi.jpg";

export const SITE_NAME = "CareersAt.Tech";
