import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { format } from "timeago.js";
import {
    CheckCircle,
    ExternalLink,
    MapPin,
    Briefcase,
    IndianRupee,
    GraduationCap,
    Calendar,
    Clock,
    Users,
    AlertCircle,
    Building2,
    Sparkles,
} from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

import Navbar from "@/components/Redesign/Navbar";
import FooterNew from "@/components/Redesign/FooterNew";
import ScrollToTop from "@/components/Redesign/ScrollToTop";
import Breadcrumb from "@/components/Redesign/JobDetail/Breadcrumb";
import JobNotFound from "@/components/Redesign/JobDetail/JobNotFound";
import JobDetailSkeleton from "@/components/Redesign/JobDetail/JobDetailSkeleton";
import SafetyBanner from "@/components/Redesign/JobDetail/SafetyBanner";

import {
    fetchAllPublishedJobSlugs,
    fetchJobV2BySlug,
    listJobsV2,
    trackJobView,
    trackJobApplyClick,
} from "@/core/apis/v2/client";
import { buildJobPostingJsonLd } from "@/core/SEO/jobPostingJsonLd";
import { buildBreadcrumbJsonLd } from "@/core/SEO/breadcrumbJsonLd";
import {
    formatEmploymentTypes,
    formatWorkMode,
    formatJobLocations,
    formatBatch,
    formatExperience,
    formatBaseSalary,
    daysUntil,
    resolveApplyUrl,
    resolveCompanyLogo,
    jobMetaDescription,
    jobMetaTitle,
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
        slugs = await fetchAllPublishedJobSlugs();
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
    let job = null;
    try {
        job = await fetchJobV2BySlug(slug);
    } catch {
        job = null;
    }
    if (!job) return { notFound: true, revalidate: 60 };
    if (job.status && job.status !== "published") return { notFound: true, revalidate: 60 };
    if (job.deletedAt) return { notFound: true, revalidate: 60 };

    if (job.jobDescription?.html) {
        job.jobDescription = {
            ...job.jobDescription,
            html: DOMPurify.sanitize(job.jobDescription.html, {
                USE_PROFILES: { html: true },
                FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
                FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "style"],
            }),
        };
    }

    let similarJobs = [];
    try {
        const tags = Array.isArray(job.topicTags) ? job.topicTags : [];
        const topicQuery = tags.length > 0 ? { topicTags: tags } : {};
        const res = await listJobsV2({
            ...topicQuery,
            exclude: slug,
            limit: 6,
            sort: "datePosted:desc",
        });
        similarJobs = (res?.data || []).filter((j) => j.slug !== slug).slice(0, 6);
    } catch {
        similarJobs = [];
    }

    return {
        props: { job, similarJobs },
        revalidate: 300,
    };
}

const ExpiredBanner = () => (
    <div className="bg-amber-50 border border-amber-200 rounded-card p-4 flex items-start gap-3 mb-6">
        <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
            <p className="text-sm font-semibold text-amber-900">This posting has expired</p>
            <p className="text-sm text-amber-800 mt-0.5">
                The application window has closed. Browse other open roles below or visit the company&apos;s careers page directly.
            </p>
        </div>
    </div>
);

const Chip = ({ children, tone = "default" }) => {
    const tones = {
        default: "bg-page text-text-secondary border-border",
        primary: "bg-primary-light text-primary border-primary/20",
        terracotta: "bg-terracotta-light text-terracotta border-terracotta/20",
        success: "bg-green-50 text-green-700 border-green-200",
        warning: "bg-amber-50 text-amber-800 border-amber-200",
        urgent: "bg-red-50 text-red-700 border-red-200",
    };
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${tones[tone] || tones.default}`}
        >
            {children}
        </span>
    );
};

const SkillsBlock = ({ title, skills, tone = "default" }) => {
    if (!Array.isArray(skills) || skills.length === 0) return null;
    return (
        <section className="bg-white rounded-card p-6 md:p-7 shadow-card border border-border">
            <h2 className="text-card-title font-semibold text-text-primary mb-4">{title}</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                    <Chip key={s} tone={tone}>
                        {s}
                    </Chip>
                ))}
            </div>
        </section>
    );
};

const SimilarJobs = ({ jobs }) => {
    if (!Array.isArray(jobs) || jobs.length === 0) return null;
    return (
        <section className="bg-white rounded-card p-6 shadow-card border border-border">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-terracotta" />
                Similar jobs
            </h3>
            <div className="flex flex-col gap-2">
                {jobs.map((j) => {
                    const logo = j.company?.logo?.icon;
                    const loc = formatJobLocations(j.jobLocation);
                    return (
                        <Link
                            key={j.slug}
                            href={`/jobs/${j.slug}`}
                            prefetch={false}
                            className="flex items-center gap-3 bg-page rounded-lg p-3 hover:bg-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            <div className="flex-shrink-0 w-8 h-8 rounded-md border border-border overflow-hidden bg-white">
                                {logo ? (
                                    <Image src={logo} alt={`${j.companyName} logo`} width={32} height={32} className="object-contain w-full h-full" />
                                ) : (
                                    <Building2 size={16} className="text-text-tertiary mx-auto mt-2" />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-text-primary truncate">{j.title}</p>
                                <p className="text-xs text-text-tertiary truncate">
                                    {[j.companyName, loc].filter(Boolean).join(" · ")}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <Link
                href="/jobs"
                className="mt-4 text-sm text-primary hover:text-primary-hover font-medium transition-colors inline-block"
            >
                View all jobs &rarr;
            </Link>
        </section>
    );
};

const ApplyCta = ({ job, source = "header", className = "" }) => {
    const applyUrl = resolveApplyUrl(job);
    const handleClick = () => {
        if (applyUrl) {
            try {
                trackJobApplyClick(job.slug);
            } catch { /* ignore */ }
            window.open(applyUrl, "_blank", "noopener,noreferrer");
        }
    };
    if (!applyUrl) {
        return (
            <button
                disabled
                className={`inline-flex items-center justify-center gap-2 bg-text-tertiary text-white font-semibold px-8 py-3.5 rounded-button text-base opacity-60 cursor-not-allowed ${className}`}
            >
                Apply link unavailable
            </button>
        );
    }
    return (
        <button
            data-apply-trigger={source === "header" ? "true" : undefined}
            onClick={handleClick}
            className={`inline-flex items-center justify-center gap-2 bg-terracotta text-white font-semibold px-8 py-3.5 rounded-button text-base hover:bg-terracotta-hover transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 ${className}`}
        >
            Apply on {job.companyName}
            <ExternalLink size={16} />
        </button>
    );
};

const StickyApplySidebar = ({ job }) => {
    const facts = [
        { icon: IndianRupee, label: "Salary", value: formatBaseSalary(job.baseSalary) },
        { icon: MapPin, label: "Location", value: formatJobLocations(job.jobLocation) },
        { icon: GraduationCap, label: "Degree", value: Array.isArray(job.degree) && job.degree.length > 0 ? job.degree.slice(0, 3).join(", ") : null },
        { icon: Calendar, label: "Batch", value: formatBatch(job.batch) },
        { icon: Briefcase, label: "Experience", value: formatExperience(job.experience) },
    ].filter((f) => f.value);

    return (
        <div className="bg-white rounded-card p-6 shadow-card border border-border sticky top-24">
            <h3 className="text-base font-semibold text-text-primary truncate">{job.title}</h3>
            <p className="text-sm text-text-secondary mt-0.5">{job.companyName}</p>
            <div className="flex flex-col gap-2.5 mt-5">
                <ApplyCta job={job} source="sidebar" className="w-full" />
            </div>
            {facts.length > 0 && (
                <div className="mt-6 pt-5 border-t border-border">
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Quick facts</h3>
                    <div className="flex flex-col">
                        {facts.map((fact, i) => (
                            <div
                                key={fact.label}
                                className={`flex items-center gap-3 py-2.5 ${i < facts.length - 1 ? "border-b border-gray-100" : ""}`}
                            >
                                <fact.icon size={15} className="text-text-tertiary flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-caption uppercase tracking-wider text-text-tertiary font-medium">{fact.label}</p>
                                    <p className="text-sm font-medium text-text-primary truncate">{fact.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {job.datePosted && (
                <p className="text-xs text-text-tertiary mt-4">Posted {format(job.datePosted)}</p>
            )}
        </div>
    );
};

const JobV2DetailPage = ({ job, similarJobs = [] }) => {
    const router = useRouter();

    useEffect(() => {
        if (!job?.slug) return;
        try { trackJobView(job.slug); } catch { /* ignore */ }
    }, [job?.slug]);

    if (router.isFallback) {
        return (
            <>
                <Navbar />
                <JobDetailSkeleton />
                <FooterNew />
            </>
        );
    }

    if (!job) {
        return (
            <>
                <Navbar />
                <JobNotFound />
                <FooterNew />
            </>
        );
    }

    const canonical = `${SITE_URL}/jobs/${job.slug}`;
    const metaTitle = jobMetaTitle(job);
    const metaDescription = jobMetaDescription(job);
    const ogImage = job.seo?.ogImage || resolveCompanyLogo(job) || DEFAULT_OG_IMAGE;
    const jsonLd = buildJobPostingJsonLd(job);
    const breadcrumbLd = buildBreadcrumbJsonLd([
        { name: "Jobs", url: `${SITE_URL}/jobs` },
        { name: job.companyName, url: job.company?.slug ? `${SITE_URL}/companies/${job.company.slug}` : `${SITE_URL}/jobs?company=${encodeURIComponent(job.company?.slug || "")}` },
        { name: job.title, url: canonical },
    ]);

    const employmentLabel = formatEmploymentTypes(job.employmentType);
    const workModeLabel = formatWorkMode(job.workMode);
    const locationLabel = formatJobLocations(job.jobLocation);
    const salaryLabel = formatBaseSalary(job.baseSalary);
    const batchLabel = formatBatch(job.batch);
    const experienceLabel = formatExperience(job.experience);
    const days = daysUntil(job.validThrough);
    const validBadgeTone = days != null && days < 0 ? "urgent" : days != null && days < 7 ? "urgent" : "default";

    const factRow = [
        { icon: MapPin, label: "Location", value: locationLabel },
        { icon: IndianRupee, label: "Salary", value: salaryLabel },
        { icon: Calendar, label: "Batch", value: batchLabel },
        { icon: Briefcase, label: "Experience", value: experienceLabel },
        { icon: GraduationCap, label: "Degree", value: Array.isArray(job.degree) && job.degree.length > 0 ? job.degree.slice(0, 2).join(", ") : null },
        { icon: Clock, label: "Posted", value: job.datePosted ? format(job.datePosted) : null },
    ].filter((f) => f.value);

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
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
                {ogImage && <meta name="twitter:image" content={ogImage} />}
                {jsonLd && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                <div className="max-w-content mx-auto px-4 lg:px-6 py-6">
                    <Breadcrumb companyName={job.companyName} jobTitle={job.title} />

                    {job.isExpired && <ExpiredBanner />}

                    <motion.header
                        initial={shouldAnimate ? { opacity: 0, y: 16 } : {}}
                        animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-white rounded-card p-6 md:p-8 shadow-card border border-border"
                    >
                        <div className="flex items-start gap-4 md:gap-5">
                            <div
                                className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-card border border-border overflow-hidden flex items-center justify-center"
                                style={{ backgroundColor: job.company?.logo?.bgColor || "#ffffff" }}
                            >
                                {resolveCompanyLogo(job) ? (
                                    <Image
                                        src={resolveCompanyLogo(job)}
                                        alt={job.company?.logo?.iconAlt || `${job.companyName} logo`}
                                        width={64}
                                        height={64}
                                        className="object-contain w-full h-full"
                                    />
                                ) : (
                                    <Building2 size={28} className="text-text-tertiary" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <h1 className="text-page-title font-bold text-text-primary leading-tight font-serif-display">
                                            {job.title}
                                        </h1>
                                        <p className="text-body font-medium text-text-secondary flex items-center gap-2 mt-1 flex-wrap">
                                            {job.company?.slug ? (
                                                <Link href={`/companies/${job.company.slug}`} className="hover:text-primary transition-colors">
                                                    {job.companyName}
                                                </Link>
                                            ) : (
                                                <span>{job.companyName}</span>
                                            )}
                                            {job.company?.isVerified && (
                                                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                                    <CheckCircle size={12} />
                                                    Verified
                                                </span>
                                            )}
                                            {job.sponsorship?.tier && job.sponsorship.tier !== "none" && (
                                                <span className="inline-flex items-center gap-1 bg-terracotta-light text-terracotta text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                                    {job.sponsorship.tier === "featured" ? "Featured" : "Sponsored"}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-3 flex-wrap">
                                    {employmentLabel && <Chip tone="primary">{employmentLabel}</Chip>}
                                    {workModeLabel && <Chip tone="default">{workModeLabel}</Chip>}
                                    {job.displayMode === "external_redirect" && <Chip tone="default">Apply on company site</Chip>}
                                    {days != null && (
                                        <Chip tone={validBadgeTone}>
                                            {days < 0
                                                ? "Closed"
                                                : days === 0
                                                ? "Closes today"
                                                : days < 7
                                                ? `Closes in ${days} day${days === 1 ? "" : "s"}`
                                                : `Apply by ${new Date(job.validThrough).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`}
                                        </Chip>
                                    )}
                                </div>

                                {factRow.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 bg-page rounded-lg p-4 mt-5">
                                        {factRow.map((item) => (
                                            <div key={item.label} className="flex items-start gap-2.5">
                                                <item.icon size={16} className="text-text-tertiary flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-caption uppercase tracking-wider text-text-tertiary font-medium">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-sm font-medium text-text-primary mt-0.5">{item.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                    <ApplyCta job={job} source="header" />
                                    {job.companyName && (
                                        <a
                                            href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(job.companyName)}&network=%5B%22F%22%2C%22S%22%5D`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 border border-primary text-primary font-medium px-6 py-3.5 rounded-button text-base hover:bg-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        >
                                            <Users size={16} />
                                            Ask for referral
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.header>

                    <div className="flex flex-col lg:flex-row gap-8 mt-8">
                        <article className="flex-1 flex flex-col gap-4 min-w-0">
                            {job.displayMode === "internal" && job.jobDescription?.html ? (
                                <section className="bg-white rounded-card p-6 md:p-7 shadow-card border border-border">
                                    <h2 className="text-card-title font-semibold text-text-primary mb-4">About the role</h2>
                                    <div className="prose prose-sm md:prose-base max-w-none text-text-secondary [&_a]:text-primary [&_a]:underline [&_li]:marker:text-primary">
                                        {parse(job.jobDescription.html)}
                                    </div>
                                </section>
                            ) : (
                                <section className="bg-white rounded-card p-6 md:p-7 shadow-card border border-dashed border-border">
                                    <h2 className="text-card-title font-semibold text-text-primary mb-2">Full description on company site</h2>
                                    <p className="text-body text-text-secondary">
                                        This role is hosted on {job.companyName}&apos;s careers page. Click <strong>Apply</strong> above for the full description and to submit your application.
                                    </p>
                                </section>
                            )}

                            <SkillsBlock title="Required skills" skills={job.requiredSkills} tone="primary" />
                            <SkillsBlock title="Preferred skills" skills={job.preferredSkills} tone="default" />

                            {(job.company?.description?.short || job.company?.description?.long || job.company?.headquarters || job.company?.foundedYear) && (
                                <section className="bg-white rounded-card p-6 md:p-7 shadow-card border border-border">
                                    <h2 className="text-card-title font-semibold text-text-primary mb-4">About {job.companyName}</h2>
                                    {job.company?.description?.short && (
                                        <p className="text-body text-text-secondary mb-3 leading-relaxed">
                                            {job.company.description.short}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-text-tertiary mt-3">
                                        {job.company?.foundedYear && <span>Founded {job.company.foundedYear}</span>}
                                        {job.company?.employeeCount && <span>{job.company.employeeCount} employees</span>}
                                        {job.company?.headquarters && <span>HQ {job.company.headquarters}</span>}
                                    </div>
                                    {job.company?.slug && (
                                        <Link
                                            href={`/companies/${job.company.slug}`}
                                            className="text-sm text-primary hover:text-primary-hover font-medium mt-4 inline-block transition-colors"
                                        >
                                            View company profile &rarr;
                                        </Link>
                                    )}
                                </section>
                            )}
                        </article>

                        <aside className="hidden lg:flex flex-col gap-4 w-[320px] flex-shrink-0">
                            <StickyApplySidebar job={job} />
                            <SimilarJobs jobs={similarJobs} />
                        </aside>

                        <div className="lg:hidden flex flex-col gap-4">
                            <SimilarJobs jobs={similarJobs} />
                        </div>
                    </div>
                </div>

                <SafetyBanner jobTitle={job.title} companyName={job.companyName} />
            </main>

            <FooterNew />
            <ScrollToTop />

            {/* Mobile sticky apply bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between px-4 py-3 max-w-content mx-auto">
                    <div className="min-w-0 mr-3">
                        <p className="text-sm font-medium text-text-primary truncate">{job.companyName}</p>
                        {salaryLabel && <p className="text-xs text-terracotta font-medium">{salaryLabel}</p>}
                    </div>
                    <ApplyCta job={job} source="mobile" />
                </div>
            </div>
        </>
    );
};

export default JobV2DetailPage;
