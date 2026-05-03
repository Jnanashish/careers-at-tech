// Build a BreadcrumbList JSON-LD from an ordered array of { name, url } items.

/**
 * @param {Array<{name: string, url: string}>} items
 * @returns {object|null}
 */
export function buildBreadcrumbJsonLd(items) {
    if (!Array.isArray(items) || items.length === 0) return null;
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
