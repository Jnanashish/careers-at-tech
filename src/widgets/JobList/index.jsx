import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/layout/Header";
import FooterNew from "@/components/Redesign/FooterNew";

import Hero from "@/components/jobs/Hero";
import FilterBar from "@/components/jobs/FilterBar";
import MobileFilterSheet from "@/components/jobs/MobileFilterSheet";
import FeaturedCarousel from "@/components/jobs/FeaturedCarousel";
import ResultsHeader from "@/components/jobs/ResultsHeader";
import JobCard from "@/components/jobs/JobCard";
import JobCardMobile from "@/components/jobs/JobCardMobile";
import Pagination from "@/components/jobs/Pagination";
import TrendingBand from "@/components/jobs/TrendingBand";

import ProfileMatch from "@/components/jobs/sidebar/ProfileMatch";
import WhatsAppDrops from "@/components/jobs/sidebar/WhatsAppDrops";
import TrendingNow from "@/components/jobs/sidebar/TrendingNow";
import SavedJobs from "@/components/jobs/sidebar/SavedJobs";
import Resources from "@/components/jobs/sidebar/Resources";

import {
    applyClientQuickFilter,
    applyClientSort,
    filtersToQuery,
    locationFilterIsCity,
    locationFilterToWorkMode,
    mapJob,
    typeFilterToApi,
    urlToFilters,
} from "./utils";

import { listJobsV2 } from "@/core/apis/v2/client";
import { firebaseEventHandler } from "@/core/eventHandler";
import { FLAGS } from "@/Helpers/featureFlags";

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 300;

const JobList = ({ initialJobs }) => {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [type, setType] = useState("All");
    const [location, setLocation] = useState("Anywhere");
    const [batch, setBatch] = useState("All");
    const [quick, setQuick] = useState(null);
    const [sort, setSort] = useState("Latest");
    const [page, setPage] = useState(1);

    const [sheetOpen, setSheetOpen] = useState(false);
    const [savedIds, setSavedIds] = useState(() => new Set());
    const [hydrated, setHydrated] = useState(false);
    const [compact, setCompact] = useState(false);

    const initialMappedJobs = useMemo(
        () => (initialJobs?.data || []).map(mapJob).filter(Boolean),
        [initialJobs]
    );

    const [jobs, setJobs] = useState(initialMappedJobs);
    const [total, setTotal] = useState(initialJobs?.total ?? 0);
    const [totalPages, setTotalPages] = useState(initialJobs?.totalPages ?? 0);
    const [loading, setLoading] = useState(false);

    const searchInputRef = useRef(null);
    const announceRef = useRef(null);

    useEffect(() => {
        if (!router.isReady || hydrated) return;
        const f = urlToFilters(router.query || {});
        setType(f.type);
        setLocation(f.location);
        setBatch(f.batch);
        setQuick(f.quick);
        setSearch(f.search);
        setSearchInput(f.search);
        setSort(f.sort);
        setPage(f.page);
        setHydrated(true);
    }, [router.isReady, router.query, hydrated]);

    useEffect(() => {
        const id = setTimeout(() => setSearch(searchInput), SEARCH_DEBOUNCE_MS);
        return () => clearTimeout(id);
    }, [searchInput]);

    useEffect(() => {
        if (!hydrated) return;
        setPage(1);
    }, [search, type, location, batch, sort, hydrated]);

    useEffect(() => {
        if (!hydrated) return;
        const next = filtersToQuery({ type, location, batch, quick, search, sort, page });
        router.replace({ pathname: router.pathname, query: next }, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, location, batch, quick, search, sort, page, hydrated]);

    useEffect(() => {
        if (!hydrated) return undefined;
        const apiType = typeFilterToApi(type);
        const workMode = locationFilterToWorkMode(location);
        const cityFilter = locationFilterIsCity(location) ? location : null;

        const params = {
            limit: PAGE_SIZE,
            page,
            sort: "datePosted:desc",
        };
        if (apiType) params.employmentType = apiType;
        if (workMode) params.workMode = workMode;
        if (batch !== "All") params.batch = batch;
        if (search) params.search = search;

        let cancelled = false;
        setLoading(true);

        (async () => {
            try {
                const res = await listJobsV2(params);
                if (cancelled) return;
                let mapped = (res?.data || []).map(mapJob).filter(Boolean);
                if (cityFilter) {
                    const lower = cityFilter.toLowerCase();
                    mapped = mapped.filter((j) => (j.location || "").toLowerCase().includes(lower));
                }
                mapped = applyClientQuickFilter(mapped, quick);
                mapped = applyClientSort(mapped, sort);
                setJobs(mapped);
                setTotal(res?.total ?? mapped.length);
                setTotalPages(res?.totalPages ?? 0);
            } catch (err) {
                if (cancelled) return;
                // eslint-disable-next-line no-console
                console.error("listJobsV2 failed", err);
                setJobs([]);
                setTotal(0);
                setTotalPages(0);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [hydrated, search, type, location, batch, quick, sort, page]);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                setCompact(window.scrollY > 120);
                ticking = false;
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            const k = e.key.toLowerCase();
            if ((e.metaKey || e.ctrlKey) && k === "k") {
                e.preventDefault();
                searchInputRef.current?.focus();
                searchInputRef.current?.select?.();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const onSave = useCallback((id) => {
        setSavedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
                firebaseEventHandler?.("job_save", { id });
            }
            return next;
        });
    }, []);

    const goToJob = useCallback(
        (job) => {
            if (!job?.slug) return;
            firebaseEventHandler?.("job_card_click", { slug: job.slug });
            router.push(`/jobs/${job.slug}`);
        },
        [router]
    );

    const heroStats = useMemo(
        () => ({
            open: total || jobs.length,
            todayDelta: "+18 today",
            internships: 38,
            remote: 61,
            newGrad: 84,
        }),
        [total, jobs.length]
    );

    const featuredJobs = useMemo(() => jobs.filter((j) => j.featured).slice(0, 6), [jobs]);

    useEffect(() => {
        if (!announceRef.current) return;
        announceRef.current.textContent = `${jobs.length} matching ${jobs.length === 1 ? "role" : "roles"}.`;
    }, [jobs.length]);

    return (
        <div
            className="font-v3-sans min-h-screen"
            style={{
                background: "var(--v3-paper)",
                color: "var(--v3-ink)",
                letterSpacing: "-0.01em",
                "--v3-header-h": compact ? "0px" : "74px",
            }}
        >
            <span ref={announceRef} aria-live="polite" className="sr-only" style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }} />

            <Header compact={compact} onMobileMenu={() => setSheetOpen(true)} />
            <Hero stats={heroStats} />

            <FilterBar
                ref={searchInputRef}
                compact={compact}
                query={searchInput}
                setQuery={setSearchInput}
                sort={sort}
                setSort={setSort}
                quick={quick}
                setQuick={setQuick}
                type={type}
                setType={setType}
                location={location}
                setLocation={setLocation}
                batch={batch}
                setBatch={setBatch}
                onMobileFiltersOpen={() => setSheetOpen(true)}
            />

            <div className="v3-main-grid">
                <div className="v3-main-left min-h-[600px]">
                    <FeaturedCarousel
                        jobs={featuredJobs}
                        saved={savedIds}
                        onSave={onSave}
                        onSelect={goToJob}
                    />

                    <ResultsHeader count={jobs.length} sort={sort} />

                    <div className="hidden md:flex flex-col gap-3">
                        {jobs.map((j) => (
                            <JobCard
                                key={j.id}
                                job={j}
                                saved={savedIds.has(j.id)}
                                onSave={onSave}
                                onClick={() => goToJob(j)}
                            />
                        ))}
                        {!loading && jobs.length === 0 && (
                            <div
                                className="font-v3-sans"
                                style={{
                                    padding: 48,
                                    textAlign: "center",
                                    border: "1px dashed var(--v3-line)",
                                    borderRadius: 16,
                                    color: "var(--v3-mute)",
                                }}
                            >
                                No roles match these filters.
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex flex-col gap-3">
                        {jobs.map((j) => (
                            <JobCardMobile
                                key={j.id}
                                job={j}
                                saved={savedIds.has(j.id)}
                                onSave={onSave}
                                onClick={() => goToJob(j)}
                            />
                        ))}
                        {!loading && jobs.length === 0 && (
                            <div
                                className="font-v3-sans"
                                style={{
                                    padding: 32,
                                    textAlign: "center",
                                    border: "1px dashed var(--v3-line)",
                                    borderRadius: 16,
                                    color: "var(--v3-mute)",
                                }}
                            >
                                No roles match these filters.
                            </div>
                        )}
                    </div>

                    <Pagination page={page} totalPages={totalPages} totalCount={total} onChange={setPage} />
                </div>

                <aside className="v3-main-aside flex flex-col gap-4">
                    {FLAGS.SIDEBAR_PROFILE_MATCH && <ProfileMatch />}
                    <WhatsAppDrops />
                    {FLAGS.SIDEBAR_TRENDING && <TrendingNow onSelect={(t) => setSearchInput(t)} />}
                    {FLAGS.SIDEBAR_SAVED && <SavedJobs savedIds={savedIds} jobs={jobs} onSelect={goToJob} />}
                    {FLAGS.SIDEBAR_RESOURCES && <Resources />}
                </aside>
            </div>

            {FLAGS.TRENDING_BAND && <TrendingBand onSelect={(t) => setSearchInput(t)} />}
            <FooterNew />

            <MobileFilterSheet
                open={sheetOpen}
                onClose={() => setSheetOpen(false)}
                type={type}
                setType={setType}
                location={location}
                setLocation={setLocation}
                batch={batch}
                setBatch={setBatch}
                quick={quick}
                setQuick={setQuick}
            />

            <style jsx global>{`
                .v3-main-grid {
                    display: block;
                    padding: 24px 16px 8px;
                }
                .v3-main-aside {
                    margin-top: 24px;
                }
                @media (min-width: 1024px) {
                    .v3-main-grid {
                        display: grid;
                        grid-template-columns: 1fr 360px;
                        gap: 32px;
                        padding: 32px 56px 8px;
                    }
                    .v3-main-aside {
                        margin-top: 0;
                        position: sticky;
                        top: 130px;
                        align-self: flex-start;
                        max-height: calc(100vh - 150px);
                        overflow-y: auto;
                    }
                }
            `}</style>
        </div>
    );
};

export default JobList;
