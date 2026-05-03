import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

import Hero from "@/components/Redesign/Hero";
import LogoWall from "@/components/Redesign/LogoWall";
import FilterBarV2 from "@/components/Redesign/FilterBarV2";
import JobCardV2 from "@/components/Redesign/JobCardV2";
import SidebarNew from "@/components/Redesign/SidebarNew";
import SkeletonList from "@/components/Redesign/SkeletonCard";
import ScrollToTop from "@/components/Redesign/ScrollToTop";

import { listJobsV2 } from "@/core/apis/v2/client";

const PAGE_SIZE = 12;
const FILTER_KEYS = ["employmentType", "workMode", "batch", "topicTags", "search", "company"];

function buildQueryFromFilters(filters, page) {
    const params = { limit: PAGE_SIZE, page, sort: "datePosted:desc" };
    for (const k of FILTER_KEYS) {
        if (filters[k] && filters[k] !== "") params[k] = filters[k];
    }
    return params;
}

const JobListV2 = ({ initialJobs }) => {
    const router = useRouter();
    const [jobs, setJobs] = useState(initialJobs?.data || []);
    const [total, setTotal] = useState(initialJobs?.total || 0);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialJobs?.hasMore ?? false);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [filters, setFilters] = useState({});

    const fetchJobs = useCallback(async (currentFilters, currentPage, append) => {
        if (append) setLoadingMore(true);
        else setLoading(true);
        try {
            const res = await listJobsV2(buildQueryFromFilters(currentFilters, currentPage));
            const data = res?.data || [];
            setTotal(res?.total ?? 0);
            setHasMore(Boolean(res?.hasMore));
            setJobs((prev) => (append ? [...prev, ...data] : data));
        } catch {
            if (!append) setJobs([]);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    const writeUrl = useCallback((nextFilters) => {
        const search = new URLSearchParams();
        for (const k of FILTER_KEYS) {
            if (nextFilters[k] && nextFilters[k] !== "") search.set(k, nextFilters[k]);
        }
        const qs = search.toString();
        const next = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
        window.history.replaceState({}, "", next);
    }, []);

    const readFiltersFromUrl = useCallback(() => {
        if (typeof window === "undefined") return {};
        const search = new URLSearchParams(window.location.search);
        const result = {};
        for (const k of FILTER_KEYS) {
            const v = search.get(k);
            if (v) result[k] = v;
        }
        return result;
    }, []);

    useEffect(() => {
        const initial = readFiltersFromUrl();
        if (Object.keys(initial).length > 0) {
            setFilters(initial);
            setPage(1);
            fetchJobs(initial, 1, false);
        }
    }, [readFiltersFromUrl, fetchJobs]);

    const handleFilterChange = (key, value) => {
        const next = { ...filters };
        if (!value || value === "") delete next[key];
        else next[key] = value;
        setFilters(next);
        setPage(1);
        writeUrl(next);
        fetchJobs(next, 1, false);
    };

    const handleSearch = (query) => handleFilterChange("search", query);

    const handlePopularFilter = (q) => {
        const map = {
            remote: ["workMode", "remote"],
            internship: ["employmentType", "INTERN"],
            frontend: ["topicTags", "frontend"],
            backend: ["topicTags", "backend"],
            data: ["topicTags", "data"],
        };
        const [k, v] = map[q] || ["search", q];
        handleFilterChange(k, v);
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchJobs(filters, nextPage, true);
    };

    return (
        <>
            <Hero onSearch={handleSearch} onFilterClick={handlePopularFilter} />
            <LogoWall />
            <FilterBarV2 activeFilters={filters} onFilterChange={handleFilterChange} totalCount={total} />

            <main id="main-content" className="bg-page min-h-screen">
                <div className="max-w-content mx-auto px-4 lg:px-6 py-8">
                    <div className="flex gap-8">
                        <div className="flex-1 max-w-card mx-auto lg:mx-0 lg:max-w-none w-full">
                            {loading && <SkeletonList count={5} />}

                            {!loading && jobs.length === 0 && (
                                <div className="bg-white rounded-card p-12 shadow-card border border-border text-center">
                                    <p className="text-lg font-semibold text-text-primary mb-2">No jobs found</p>
                                    <p className="text-sm text-text-secondary">Try adjusting your filters or search query.</p>
                                </div>
                            )}

                            {!loading && jobs.length > 0 && (
                                <>
                                    <div className="flex flex-col gap-4">
                                        {jobs.map((job, index) => (
                                            <JobCardV2 key={job.slug || job._id} job={job} index={index} />
                                        ))}
                                    </div>

                                    <div className="mt-8 text-center">
                                        <p className="text-sm text-text-tertiary mb-4">
                                            Showing {jobs.length} of {total} jobs
                                        </p>
                                        {hasMore && (
                                            <button
                                                onClick={handleLoadMore}
                                                disabled={loadingMore}
                                                className="inline-flex items-center gap-2 border border-primary text-primary rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                            >
                                                {loadingMore && <Loader2 size={16} className="animate-spin" />}
                                                {loadingMore ? "Loading..." : "Load more jobs"}
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="hidden lg:block w-[320px] flex-shrink-0">
                            <SidebarNew />
                        </div>
                    </div>
                </div>
            </main>

            <ScrollToTop />
        </>
    );
};

export default JobListV2;
