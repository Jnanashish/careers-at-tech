import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
    Building2,
    MapPin,
    Globe,
    ExternalLink,
    Star,
    CheckCircle,
    Briefcase,
    Users,
    Calendar,
    ChevronRight,
    Sparkles,
} from "lucide-react";

import Navbar from "@/components/Redesign/Navbar";
import FooterNew from "@/components/Redesign/FooterNew";
import ScrollToTop from "@/components/Redesign/ScrollToTop";

import {
    fetchAllActiveCompanySlugs,
    fetchCompanyV2BySlug,
    listJobsV2,
} from "@/core/apis/v2/client";
import { buildOrganizationJsonLd } from "@/core/SEO/organizationJsonLd";
import { buildBreadcrumbJsonLd } from "@/core/SEO/breadcrumbJsonLd";
import {
    formatEmploymentTypes,
    formatWorkMode,
    formatJobLocations,
    formatBaseSalary,
} from "@/Helpers/jobV2helpers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;

const shouldAnimate =
    typeof window !== "undefined"
        ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : true;

export async function getStaticPaths() {
    let slugs = [];
    try {
        slugs = await fetchAllActiveCompanySlugs();
    } catch {
        slugs = [];
    }
    return {
        paths: slugs.slice(0, 30).map((slug) => ({ params: { slug } })),
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }) {
    const slug = params?.slug;
    let company = null;
    try {
        company = await fetchCompanyV2BySlug(slug);
    } catch {
        company = null;
    }
    if (!company) return { notFound: true, revalidate: 60 };
    if (company.status && company.status !== "active") return { notFound: true, revalidate: 60 };
    if (company.deletedAt) return { notFound: true, revalidate: 60 };

    let jobs = Array.isArray(company.recentJobs) ? company.recentJobs : [];
    if (jobs.length === 0) {
        try {
            const res = await listJobsV2({ company: slug, limit: 20, sort: "datePosted:desc" });
            jobs = res?.data || [];
        } catch {
            jobs = [];
        }
    }

    return {
        props: { company, jobs },
        revalidate: 600,
    };
}

const COMPANY_TYPE_LABEL = {
    bigtech: "Big Tech",
    unicorn: "Unicorn",
    startup: "Startup",
    product: "Product",
    service: "Service",
    mnc: "MNC",
    consulting: "Consulting",
    other: "Other",
};

const StatPill = ({ icon: Icon, label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Icon size={15} className="text-text-tertiary flex-shrink-0" />
            <span>
                <span className="text-text-tertiary">{label}: </span>
                <span className="font-medium text-text-primary">{value}</span>
            </span>
        </div>
    );
};

const SocialLink = ({ href, code, label }) => {
    if (!href) return null;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-text-secondary hover:text-primary hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-xs font-bold"
        >
            {code}
        </a>
    );
};

const RatingBadge = ({ source, value }) => {
    if (value == null) return null;
    return (
        <div className="flex items-center gap-1.5 bg-page rounded-lg px-3 py-2">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-semibold text-text-primary">{value.toFixed(1)}</span>
            <span className="text-xs text-text-tertiary">on {source}</span>
        </div>
    );
};

const JobCard = ({ job }) => {
    const employment = formatEmploymentTypes(job.employmentType);
    const workMode = formatWorkMode(job.workMode);
    const location = formatJobLocations(job.jobLocation);
    const salary = formatBaseSalary(job.baseSalary);
    return (
        <Link
            href={`/jobs/${job.slug}`}
            prefetch={false}
            className="group block bg-white rounded-card p-5 shadow-card border border-border hover:shadow-card-hover hover:border-primary/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <h3 className="text-card-title font-semibold text-text-primary truncate group-hover:text-primary transition-colors">
                        {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap text-xs text-text-secondary">
                        {employment && <span>{employment}</span>}
                        {workMode && (
                            <>
                                <span className="text-text-tertiary">·</span>
                                <span>{workMode}</span>
                            </>
                        )}
                        {location && (
                            <>
                                <span className="text-text-tertiary">·</span>
                                <span>{location}</span>
                            </>
                        )}
                    </div>
                    {salary && (
                        <p className="text-sm font-medium text-terracotta mt-2">{salary}</p>
                    )}
                </div>
                <ChevronRight size={18} className="text-text-tertiary group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
            </div>
        </Link>
    );
};

const CompanyDetailPage = ({ company, jobs = [] }) => {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <>
                <Navbar />
                <div className="bg-cream min-h-screen pt-20">
                    <div className="max-w-content mx-auto px-4 py-12">
                        <div className="animate-pulse h-64 bg-white rounded-card border border-border" />
                    </div>
                </div>
                <FooterNew />
            </>
        );
    }

    if (!company) {
        return (
            <>
                <Navbar />
                <div className="bg-cream min-h-screen pt-20">
                    <div className="max-w-card mx-auto mt-24 px-4 text-center">
                        <Building2 size={48} className="text-text-tertiary mx-auto mb-6" />
                        <h1 className="text-2xl font-bold text-text-primary mb-3">Company not found</h1>
                        <Link href="/companies" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-button hover:bg-primary-hover transition-colors">
                            Browse all companies →
                        </Link>
                    </div>
                </div>
                <FooterNew />
            </>
        );
    }

    const canonical = `${SITE_URL}/companies/${company.slug}`;
    const metaTitle = company.seo?.metaTitle || `${company.companyName} jobs and careers — CareersAt.Tech`;
    const metaDescription = company.seo?.metaDescription || company.description?.short || `Open roles at ${company.companyName}. Browse current jobs, learn about the team, and apply on CareersAt.Tech.`;
    const ogImage = company.seo?.ogImage || company.logo?.banner || company.logo?.icon || DEFAULT_OG_IMAGE;
    const orgJsonLd = buildOrganizationJsonLd(company);
    const breadcrumbLd = buildBreadcrumbJsonLd([
        { name: "Companies", url: `${SITE_URL}/companies` },
        { name: company.companyName, url: canonical },
    ]);

    const description = company.description?.long || company.description?.short;
    const typeLabel = COMPANY_TYPE_LABEL[company.companyType];
    const openJobsCount = company.stats?.openJobsCount ?? jobs.length;

    return (
        <>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonical} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:url" content={canonical} />
                <meta property="og:site_name" content="CareersAt.Tech" />
                <meta property="og:locale" content="en_IN" />
                {ogImage && <meta property="og:image" content={ogImage} />}
                <meta name="twitter:card" content={company.logo?.banner ? "summary_large_image" : "summary"} />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
                {ogImage && <meta name="twitter:image" content={ogImage} />}
                {orgJsonLd && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
                    />
                )}
                {breadcrumbLd && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
                    />
                )}
            </Head>

            <Navbar />

            <main id="main-content" className="bg-cream min-h-screen pt-20 pb-12">
                {/* Hero */}
                <motion.section
                    initial={shouldAnimate ? { opacity: 0, y: 16 } : {}}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white border-b border-border"
                >
                    {company.logo?.banner && (
                        <div
                            className="h-32 md:h-48 w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${company.logo.banner})` }}
                            aria-hidden="true"
                        />
                    )}
                    <div className="max-w-content mx-auto px-4 lg:px-6 py-6">
                        <nav aria-label="Breadcrumb" className="mb-4">
                            <ol className="flex items-center gap-1.5 text-sm text-text-tertiary">
                                <li>
                                    <Link href="/companies" className="text-primary hover:text-primary-hover transition-colors">
                                        Companies
                                    </Link>
                                </li>
                                <li><ChevronRight size={14} className="text-border" /></li>
                                <li className="text-text-primary font-medium truncate max-w-[280px]">{company.companyName}</li>
                            </ol>
                        </nav>

                        <div className="flex items-start gap-4 md:gap-5">
                            <div
                                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-card border border-border overflow-hidden flex items-center justify-center -mt-12 shadow-card bg-white"
                                style={{ backgroundColor: company.logo?.bgColor || "#ffffff" }}
                            >
                                {company.logo?.icon ? (
                                    <Image
                                        src={company.logo.icon}
                                        alt={company.logo?.iconAlt || `${company.companyName} logo`}
                                        width={96}
                                        height={96}
                                        className="object-contain w-full h-full p-2"
                                    />
                                ) : (
                                    <Building2 size={32} className="text-text-tertiary" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h1 className="text-page-title font-bold text-text-primary leading-tight font-serif-display">
                                    {company.companyName}
                                </h1>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    {company.isVerified && (
                                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                            <CheckCircle size={12} />
                                            Verified
                                        </span>
                                    )}
                                    {typeLabel && (
                                        <span className="inline-flex items-center bg-primary-light text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                                            {typeLabel}
                                        </span>
                                    )}
                                    {company.industry && (
                                        <span className="text-sm text-text-secondary">{company.industry}</span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                                    <StatPill icon={MapPin} label="HQ" value={company.headquarters} />
                                    <StatPill icon={Users} label="Employees" value={company.employeeCount} />
                                    <StatPill icon={Calendar} label="Founded" value={company.foundedYear} />
                                    <StatPill icon={Briefcase} label="Open jobs" value={openJobsCount > 0 ? openJobsCount : null} />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <div className="max-w-content mx-auto px-4 lg:px-6 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 flex flex-col gap-6 min-w-0">
                            {description && (
                                <section className="bg-white rounded-card p-6 md:p-7 shadow-card border border-border">
                                    <h2 className="text-card-title font-semibold text-text-primary mb-4">
                                        About {company.companyName}
                                    </h2>
                                    <p className="text-body text-text-secondary leading-relaxed whitespace-pre-line">
                                        {description}
                                    </p>
                                </section>
                            )}

                            <section className="bg-white rounded-card p-6 md:p-7 shadow-card border border-border">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-card-title font-semibold text-text-primary flex items-center gap-2">
                                        <Sparkles size={16} className="text-terracotta" />
                                        Open roles {jobs.length > 0 && <span className="text-sm font-normal text-text-tertiary">({jobs.length})</span>}
                                    </h2>
                                    {jobs.length >= 20 && openJobsCount > 20 && (
                                        <Link
                                            href={`/jobs?company=${encodeURIComponent(company.slug)}`}
                                            className="text-sm text-primary hover:text-primary-hover font-medium transition-colors"
                                        >
                                            View all {openJobsCount} →
                                        </Link>
                                    )}
                                </div>
                                {jobs.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {jobs.map((j) => (
                                            <JobCard key={j.slug || j._id} job={j} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-page rounded-lg p-6 text-center">
                                        <Briefcase size={28} className="text-text-tertiary mx-auto mb-2" />
                                        <p className="text-sm text-text-secondary">No open roles at the moment.</p>
                                        {company.careerPageLink && (
                                            <a
                                                href={company.careerPageLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-primary hover:text-primary-hover font-medium mt-2 inline-block"
                                            >
                                                Check {company.companyName}&apos;s careers page →
                                            </a>
                                        )}
                                    </div>
                                )}
                            </section>

                            {Array.isArray(company.techStack) && company.techStack.length > 0 && (
                                <section className="bg-white rounded-card p-6 md:p-7 shadow-card border border-border">
                                    <h2 className="text-card-title font-semibold text-text-primary mb-4">Tech stack</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {company.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-page text-text-secondary border border-border"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {Array.isArray(company.locations) && company.locations.length > 0 && (
                                <section className="bg-white rounded-card p-6 md:p-7 shadow-card border border-border">
                                    <h2 className="text-card-title font-semibold text-text-primary mb-4">Office locations</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {company.locations.map((loc) => (
                                            <span
                                                key={loc}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-page text-text-secondary border border-border"
                                            >
                                                <MapPin size={12} />
                                                {loc}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <aside className="lg:w-[320px] flex-shrink-0 flex flex-col gap-4">
                            <div className="bg-white rounded-card p-6 shadow-card border border-border">
                                <h3 className="text-sm font-semibold text-text-primary mb-4">Links</h3>
                                <div className="flex flex-col gap-2.5">
                                    {company.website && (
                                        <a
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-between gap-2 px-4 py-2.5 bg-page rounded-lg text-sm font-medium text-text-primary hover:bg-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <Globe size={15} className="text-text-tertiary" />
                                                Website
                                            </span>
                                            <ExternalLink size={13} className="text-text-tertiary" />
                                        </a>
                                    )}
                                    {company.careerPageLink && (
                                        <a
                                            href={company.careerPageLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-between gap-2 px-4 py-2.5 bg-terracotta text-white rounded-lg text-sm font-medium hover:bg-terracotta-hover transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <Briefcase size={15} />
                                                Careers page
                                            </span>
                                            <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>

                                {(company.socialLinks?.linkedin || company.socialLinks?.twitter || company.socialLinks?.instagram || company.socialLinks?.glassdoor) && (
                                    <div className="mt-5 pt-5 border-t border-border">
                                        <p className="text-xs uppercase tracking-wider text-text-tertiary font-medium mb-3">Follow</p>
                                        <div className="flex gap-2">
                                            <SocialLink href={company.socialLinks?.linkedin} code="LI" label="LinkedIn" />
                                            <SocialLink href={company.socialLinks?.twitter} code="TW" label="Twitter" />
                                            <SocialLink href={company.socialLinks?.instagram} code="IG" label="Instagram" />
                                            <SocialLink href={company.socialLinks?.glassdoor} code="GD" label="Glassdoor" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {(company.ratings?.glassdoor != null || company.ratings?.ambitionBox != null) && (
                                <div className="bg-white rounded-card p-6 shadow-card border border-border">
                                    <h3 className="text-sm font-semibold text-text-primary mb-3">Employee ratings</h3>
                                    <div className="flex flex-col gap-2">
                                        <RatingBadge source="Glassdoor" value={company.ratings?.glassdoor} />
                                        <RatingBadge source="AmbitionBox" value={company.ratings?.ambitionBox} />
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </main>

            <FooterNew />
            <ScrollToTop />
        </>
    );
};

export default CompanyDetailPage;
