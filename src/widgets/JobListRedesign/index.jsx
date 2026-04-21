import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

import Hero from "@/components/Redesign/Hero";
import LogoWall from "@/components/Redesign/LogoWall";
import FilterBar from "@/components/Redesign/FilterBar";
import JobCardNew from "@/components/Redesign/JobCardNew";
import SidebarNew from "@/components/Redesign/SidebarNew";
import SkeletonList from "@/components/Redesign/SkeletonCard";
import ScrollToTop from "@/components/Redesign/ScrollToTop";

import { getJobListing } from "@/Helpers/jobdetailshelper";

const JobListRedesign = ({ jobData }) => {
  const [pageno, setPageno] = useState(1);
  const [params, setParams] = useState(null);
  const [jobdata, setJobdata] = useState(jobData?.data || []);
  const [totalJobCount, setTotalJobCount] = useState(jobData?.totalCount || 0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const router = useRouter();
  const paramsToCheck = ["batch", "year", "companyname", "degree", "jobtype", "query", "location"];
  const pageSize = 10;

  const updateParam = (key, value) => {
    if (!value || value === "") {
      const tempParams = params ? params.filter((p) => Object.keys(p)[0] !== key) : [];
      setParams(tempParams.length > 0 ? tempParams : null);
      setActiveFilters((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      return;
    }
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
    setParams((prevParam) => {
      if (prevParam !== null) {
        const keyExists = prevParam.some((p) => Object.keys(p)[0] === key);
        if (keyExists) {
          return prevParam.map((p) => (Object.keys(p)[0] === key ? { [key]: value } : p));
        }
        return [...prevParam, { [key]: value }];
      }
      return [{ [key]: value }];
    });
  };

  const getJoblistingData = async (queryParams, page = 1, append = false) => {
    if (!append) setLoading(true);
    else setLoadingMore(true);

    const res = await getJobListing(queryParams, page, pageSize);
    if (res && Array.isArray(res?.data)) {
      setTotalJobCount(res.totalCount);
      if (append) {
        setJobdata((prev) => [...prev, ...res.data]);
      } else {
        setJobdata(res.data);
      }
    }
    setLoading(false);
    setLoadingMore(false);
  };

  const updateSearchParamsInUrl = (queryParams) => {
    window.history.replaceState({}, "", `${window.location.pathname}`);
    const searchParams = new URLSearchParams();
    queryParams.forEach((p) => {
      const key = Object.keys(p)[0];
      searchParams.set(key, p[key]);
    });
    window.history.replaceState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
  };

  const handleFilterChange = (key, value) => {
    setPageno(1);
    setJobdata([]);
    updateParam(key, value);
  };

  const handleSearch = (query) => {
    handleFilterChange("query", query);
  };

  const handlePopularFilter = (query) => {
    const isLocation = ["remote"].includes(query);
    const isJobType = ["internship", "full"].includes(query);
    if (isLocation) handleFilterChange("location", query);
    else if (isJobType) handleFilterChange("jobtype", query);
    else handleFilterChange("query", query);
  };

  const handleLoadMore = () => {
    const nextPage = pageno + 1;
    setPageno(nextPage);
    getJoblistingData(params, nextPage, true);
  };

  const checkParameterInUrl = () => {
    setParams(null);
    setJobdata([]);
    setPageno(1);
    setActiveFilters({});

    const searchParams = new URLSearchParams(window.location.search);
    let hasQuery = false;
    const newFilters = {};
    const newParams = [];

    paramsToCheck.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        newParams.push({ [key]: value });
        newFilters[key] = value;
        hasQuery = true;
      }
    });

    if (hasQuery) {
      setActiveFilters(newFilters);
      setParams(newParams);
    } else {
      getJoblistingData(null);
    }
  };

  useEffect(() => {
    if (params !== null && params.length > 0) {
      getJoblistingData(params);
      updateSearchParamsInUrl(params);
    } else if (params !== null && params.length === 0) {
      setParams(null);
      window.history.replaceState({}, "", window.location.pathname);
      getJoblistingData(null);
    }
  }, [params]);

  useEffect(() => {
    const handleRouteChange = ({ shallow }) => {
      if (!shallow) checkParameterInUrl();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  const showingCount = jobdata.length;
  const hasMore = showingCount < totalJobCount;

  return (
    <>
      <Hero onSearch={handleSearch} onFilterClick={handlePopularFilter} />
      <LogoWall />
      <FilterBar
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        totalCount={totalJobCount}
      />

      <main id="main-content" className="bg-page min-h-screen">
        <div className="max-w-content mx-auto px-4 lg:px-6 py-8">
          <div className="flex gap-8">
            {/* Job cards column */}
            <div className="flex-1 max-w-card mx-auto lg:mx-0 lg:max-w-none w-full">
              {loading && <SkeletonList count={5} />}

              {!loading && jobdata.length === 0 && (
                <div className="bg-white rounded-card p-12 shadow-card border border-border text-center">
                  <p className="text-lg font-semibold text-text-primary mb-2">
                    No jobs found
                  </p>
                  <p className="text-sm text-text-secondary">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              )}

              {!loading && jobdata.length > 0 && (
                <>
                  <div className="flex flex-col gap-4">
                    {jobdata.map((job, index) => (
                      <JobCardNew key={job.id} data={job} index={index} />
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-text-tertiary mb-4">
                      Showing {showingCount} of {totalJobCount} jobs
                    </p>
                    {hasMore && (
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="inline-flex items-center gap-2 border border-primary text-primary rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {loadingMore && (
                          <Loader2 size={16} className="animate-spin" />
                        )}
                        {loadingMore ? "Loading..." : "Load More Jobs"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
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

export default JobListRedesign;
