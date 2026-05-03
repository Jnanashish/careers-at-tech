// Build an Organization JSON-LD object from a v2 company document.
// Returns null if name, url, or logo missing — we keep the schema strict so
// only well-populated companies emit structured data, avoiding "thin" entries
// that hurt overall site quality signals.
//
// Schema reference: https://schema.org/Organization

function pickSameAs(socialLinks) {
    if (!socialLinks || typeof socialLinks !== "object") return [];
    return Object.values(socialLinks).filter((v) => typeof v === "string" && v.length > 0);
}

/**
 * @param {object} company  v2 company doc as returned by GET /api/companies/v2/:slug
 * @returns {object|null}
 */
export function buildOrganizationJsonLd(company) {
    if (!company) return null;
    const name = company.companyName;
    const url = company.website;
    const logo = company.logo?.icon;
    if (!name || !url || !logo) return null;

    const ld = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name,
        url,
        logo,
    };

    if (company.description?.short) ld.description = company.description.short;
    if (company.foundedYear) ld.foundedDate = `${company.foundedYear}-01-01`;

    const sameAs = pickSameAs(company.socialLinks);
    if (sameAs.length > 0) ld.sameAs = sameAs;

    if (company.headquarters) {
        ld.address = { "@type": "PostalAddress", addressLocality: company.headquarters };
    }

    return ld;
}
