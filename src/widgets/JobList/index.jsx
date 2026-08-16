import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/layout/Header";
import FooterNew from "@/components/Redesign/FooterNew";

import Hero from "@/components/jobs/Hero";
import FilterBar from "@/components/jobs/FilterBar";
import MobileFilterSheet from "@/components/jobs/MobileFilterSheet";
import FeaturedCarousel from "@/components/jobs/FeaturedCarousel";
import ResumePromptsBanner from "@/components/jobs/ResumePromptsBanner";
import ResultsHeader from "@/components/jobs/ResultsHeader";
import JobCard from "@/components/jobs/JobCard";
import JobCardMobile from "@/components/jobs/JobCardMobile";
import Pagination from "@/components/jobs/Pagination";

import WhatsAppDrops from "@/components/jobs/sidebar/WhatsAppDrops";

import {
    applyClientQuickFilter,
    applyClientSort,
    fetchAllJobsV2,
    filtersToQuery,
    jobMatchesCity,
    locationFilterIsCity,
    locationFilterToWorkMode,
    mapJob,
    typeFilterToApi,
    urlToFilters,
} from "./utils";

import { listJobsV2 } from "@/core/apis/v2/client";
import { firebaseEventHandler } from "@/core/eventHandler";

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
    const filterChangeArmed = useRef(false);

    // getStaticProps already fetched page 1 with the default sort, and those
    // rows are sitting in `jobs` before hydration. The fetch effect below used to
    // fire regardless and pull the exact same 12 records again on every single
    // /jobs visit — a wasted round trip plus a loading flicker over identical
    // content. Skip that one run, and only that one: any URL filter, any deeper
    // page, or an empty SSG payload still fetches as before.
    const canReuseInitialJobs = useRef(initialMappedJobs.length > 0);

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
        // First run after hydration coincides with filters being seeded from the
        // URL — don't clobber a deep-linked ?page=N. Reset only on later changes.
        if (!filterChangeArmed.current) {
            filterChangeArmed.current = true;
            return;
        }
        setPage(1);
    }, [search, type, location, batch, sort, hydrated]);

    useEffect(() => {
        if (totalPages > 0 && page > totalPages) setPage(totalPages);
    }, [totalPages, page]);

    useEffect(() => {
        if (!hydrated) return;
        const next = filtersToQuery({ type, location, batch, quick, search, sort, page });
        router.replace({ pathname: router.pathname, query: next }, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, location, batch, quick, search, sort, page, hydrated]);

    useEffect(() => {
        if (!hydrated) return undefined;

        if (canReuseInitialJobs.current) {
            canReuseInitialJobs.current = false;
            const isUntouchedFirstPage =
                type === "All" &&
                location === "Anywhere" &&
                batch === "All" &&
                !quick &&
                !search &&
                sort === "Latest" &&
                page === 1;
            // Same params getStaticProps used (limit 12, page 1, datePosted:desc),
            // and both client-side passes are no-ops at these defaults — the
            // response would be byte-identical to what is already rendered.
            if (isUntouchedFirstPage) return undefined;
        }

        const apiType = typeFilterToApi(type);
        const workMode = locationFilterToWorkMode(location);
        const cityFilter = locationFilterIsCity(location) ? location : null;

        const baseParams = { sort: "datePosted:desc" };
        if (apiType) baseParams.employmentType = apiType;
        if (workMode) baseParams.workMode = workMode;
        if (batch !== "All") baseParams.batch = batch;
        if (search) baseParams.search = search;

        let cancelled = false;
        setLoading(true);

        (async () => {
            try {
                if (cityFilter) {
                    // No backend city param: pull the full filtered set, then
                    // filter + paginate by city on the client so the count and
                    // pagination reflect the real number of matching roles.
                    const all = await fetchAllJobsV2(baseParams);
                    if (cancelled) return;
                    let mapped = all.map(mapJob).filter(Boolean);
                    mapped = mapped.filter((j) => jobMatchesCity(j, cityFilter));
                    mapped = applyClientQuickFilter(mapped, quick);
                    mapped = applyClientSort(mapped, sort);
                    const count = mapped.length;
                    const pages = Math.max(1, Math.ceil(count / PAGE_SIZE));
                    const start = (Math.min(page, pages) - 1) * PAGE_SIZE;
                    setJobs(mapped.slice(start, start + PAGE_SIZE));
                    setTotal(count);
                    setTotalPages(count === 0 ? 0 : pages);
                } else {
                    const res = await listJobsV2({ ...baseParams, limit: PAGE_SIZE, page });
                    if (cancelled) return;
                    let mapped = (res?.data || []).map(mapJob).filter(Boolean);
                    mapped = applyClientQuickFilter(mapped, quick);
                    mapped = applyClientSort(mapped, sort);
                    setJobs(mapped);
                    setTotal(res?.total ?? mapped.length);
                    setTotalPages(res?.totalPages ?? 0);
                }
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

    const featuredJobs = useMemo(() => jobs.filter((j) => j.featured).slice(0, 6), [jobs]);

    useEffect(() => {
        if (!announceRef.current) return;
        announceRef.current.textContent = `${total} matching ${total === 1 ? "role" : "roles"}.`;
    }, [total]);

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
            <Hero />

            <FilterBar
                ref={searchInputRef}
                compact={compact}
                query={searchInput}
                setQuery={setSearchInput}
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
                <main id="main-content" className="v3-main-left min-h-[600px]">
                    <ResumePromptsBanner />
                    <FeaturedCarousel
                        jobs={featuredJobs}
                        saved={savedIds}
                        onSave={onSave}
                        onSelect={goToJob}
                    />

                    <ResultsHeader count={total} sort={sort} />

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
                </main>

                <aside className="v3-main-aside flex flex-col gap-4">
                    <WhatsAppDrops />
                </aside>
            </div>

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
