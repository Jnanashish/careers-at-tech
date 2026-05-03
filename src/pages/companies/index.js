import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Search, Building2, Loader2, Briefcase, CheckCircle } from "lucide-react";

import Navbar from "@/components/Redesign/Navbar";
import FooterNew from "@/components/Redesign/FooterNew";
import ScrollToTop from "@/components/Redesign/ScrollToTop";
import Meta from "@/core/SEO/Meta";

import { listCompaniesV2 } from "@/core/apis/v2/client";

const PAGE_SIZE = 24;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";

export async function getStaticProps() {
    let initial = { data: [], total: 0, page: 1, hasMore: false };
    try {
        initial = await listCompaniesV2({ limit: PAGE_SIZE, page: 1, sort: "companyName:asc" });
    } catch { /* ignore */ }
    return {
        props: { initial },
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

const CompanyCard = ({ company, index = 0 }) => {
    const logo = company.logo?.icon;
    const logoBg = company.logo?.bgColor || "#ffffff";
    const typeLabel = COMPANY_TYPE_LABEL[company.companyType];
    const openJobs = company.stats?.openJobsCount ?? 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
        >
            <Link
                href={`/companies/${company.slug}`}
                prefetch={false}
                className="group block h-full bg-white rounded-card p-5 shadow-card border border-border hover:shadow-card-hover hover:border-terracotta/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                <div className="flex items-center gap-3">
                    <div
                        className="flex-shrink-0 w-12 h-12 rounded-card border border-border overflow-hidden flex items-center justify-center"
                        style={{ backgroundColor: logoBg }}
                    >
                        {logo ? (
                            <Image
                                src={logo}
                                alt={`${company.companyName} logo`}
                                width={48}
                                height={48}
                                className="object-contain w-full h-full p-1"
                            />
                        ) : (
                            <Building2 size={20} className="text-text-tertiary" />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-card-title font-semibold text-text-primary truncate group-hover:text-primary transition-colors flex items-center gap-1.5">
                            <span className="truncate">{company.companyName}</span>
                            {company.isVerified && (
                                <CheckCircle size={14} className="text-secondary flex-shrink-0" aria-label="Verified" />
                            )}
                        </h3>
                        {(typeLabel || company.industry) && (
                            <p className="text-xs text-text-tertiary truncate mt-0.5">
                                {[typeLabel, company.industry].filter(Boolean).join(" · ")}
                            </p>
                        )}
                    </div>
                </div>

                {company.description?.short && (
                    <p className="text-sm text-text-secondary mt-3 line-clamp-2 leading-relaxed">
                        {company.description.short}
                    </p>
                )}

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1.5 text-xs text-text-tertiary">
                        <Briefcase size={12} />
                        {openJobs > 0 ? `${openJobs} open role${openJobs === 1 ? "" : "s"}` : "No open roles"}
                    </span>
                    <span className="text-xs text-primary font-medium group-hover:translate-x-0.5 transition-transform">
                        View →
                    </span>
                </div>
            </Link>
        </motion.div>
    );
};

const CompaniesPage = ({ initial }) => {
    const router = useRouter();
    const [companies, setCompanies] = useState(initial?.data || []);
    const [total, setTotal] = useState(initial?.total || 0);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initial?.hasMore ?? false);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchCompanies = useCallback(async ({ q = "", currentPage = 1, append = false }) => {
        if (append) setLoadingMore(true);
        else setLoading(true);
        try {
            const res = await listCompaniesV2({
                limit: PAGE_SIZE,
                page: currentPage,
                sort: "companyName:asc",
                ...(q ? { search: q } : {}),
            });
            const data = res?.data || [];
            setTotal(res?.total ?? 0);
            setHasMore(Boolean(res?.hasMore));
            setCompanies((prev) => (append ? [...prev, ...data] : data));
        } catch {
            if (!append) setCompanies([]);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const initialQ = new URLSearchParams(window.location.search).get("search") || "";
        if (initialQ) {
            setSearchInput(initialQ);
            setSearch(initialQ);
            setPage(1);
            fetchCompanies({ q: initialQ, currentPage: 1, append: false });
        }
    }, [fetchCompanies]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const q = searchInput.trim();
        setSearch(q);
        setPage(1);
        const next = q ? `${window.location.pathname}?search=${encodeURIComponent(q)}` : window.location.pathname;
        window.history.replaceState({}, "", next);
        fetchCompanies({ q, currentPage: 1, append: false });
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchCompanies({ q: search, currentPage: nextPage, append: true });
    };

    return (
        <>
            <Meta
                title="Companies hiring freshers in India | CareersAt.Tech"
                description="Browse 450+ tech companies hiring freshers in India. Filter by industry, type, and location to find your next employer."
                canonical={`${SITE_URL}/companies`}
            />
            <Navbar />

            <main id="main-content" className="bg-cream min-h-screen pt-20 pb-12">
                <section className="bg-white border-b border-border">
                    <div className="max-w-content mx-auto px-4 lg:px-6 py-10">
                        <h1 className="text-page-title font-bold text-text-primary font-serif-display">
                            Companies hiring freshers
                        </h1>
                        <p className="text-body text-text-secondary mt-2 max-w-[640px]">
                            {total > 0 ? `${total} companies` : "Companies"} actively hiring tech freshers in India. Click through to see open roles, tech stack, and company details.
                        </p>

                        <form onSubmit={handleSubmit} className="relative max-w-[480px] mt-6">
                            <div className="relative flex items-center bg-white border border-border rounded-xl shadow-card focus-within:border-primary focus-within:shadow-search-focus transition-all">
                                <Search size={18} className="absolute left-4 text-text-tertiary pointer-events-none" />
                                <input
                                    type="search"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Search companies..."
                                    className="w-full h-12 pl-11 pr-24 rounded-xl text-base text-text-primary placeholder:text-text-tertiary outline-none bg-transparent"
                                    aria-label="Search companies"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                <div className="max-w-content mx-auto px-4 lg:px-6 py-8">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-card p-5 border border-border animate-pulse h-[170px]" />
                            ))}
                        </div>
                    ) : companies.length === 0 ? (
                        <div className="bg-white rounded-card p-12 shadow-card border border-border text-center">
                            <Building2 size={48} className="text-text-tertiary mx-auto mb-4" />
                            <p className="text-lg font-semibold text-text-primary mb-2">No companies match your search</p>
                            <p className="text-sm text-text-secondary">Try a broader keyword.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {companies.map((c, i) => (
                                    <CompanyCard key={c.slug || c._id} company={c} index={i} />
                                ))}
                            </div>
                            {hasMore && (
                                <div className="mt-8 text-center">
                                    <p className="text-sm text-text-tertiary mb-4">
                                        Showing {companies.length} of {total} companies
                                    </p>
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={loadingMore}
                                        className="inline-flex items-center gap-2 border border-primary text-primary rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    >
                                        {loadingMore && <Loader2 size={16} className="animate-spin" />}
                                        {loadingMore ? "Loading..." : "Load more"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <FooterNew />
            <ScrollToTop />
        </>
    );
};

export default CompaniesPage;
