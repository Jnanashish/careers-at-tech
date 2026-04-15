import { useState, useReducer, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Redesign/Navbar";
import FooterNew from "@/components/Redesign/FooterNew";
import SearchBuilder from "@/components/LinkedInSearch/SearchBuilder";
import ReferralFinder from "@/components/LinkedInSearch/ReferralFinder";
import ActiveFiltersBar from "@/components/LinkedInSearch/ActiveFiltersBar";
import URLPreview from "@/components/LinkedInSearch/URLPreview";
import TemplateBar from "@/components/LinkedInSearch/TemplateBar";
import HumanReadableSummary from "@/components/LinkedInSearch/HumanReadableSummary";
import useLinkedInURL from "@/components/LinkedInSearch/hooks/useLinkedInURL";
import useTemplates from "@/components/LinkedInSearch/hooks/useTemplates";
import {
  INITIAL_JOB_FILTERS,
  INITIAL_REFERRAL_FILTERS,
} from "@/components/LinkedInSearch/lib/linkedin-params";
import {
  encodeFiltersToHash,
  decodeFiltersFromHash,
} from "@/components/LinkedInSearch/lib/url-builder";

const shouldAnimate =
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

function jobFilterReducer(state, action) {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, [action.key]: action.value };
    case "TOGGLE_CHIP": {
      const arr = state[action.key];
      return {
        ...state,
        [action.key]: arr.includes(action.value)
          ? arr.filter((v) => v !== action.value)
          : [...arr, action.value],
      };
    }
    case "REMOVE_FILTER": {
      const current = state[action.key];
      if (Array.isArray(current)) {
        return {
          ...state,
          [action.key]: current.filter((v) => v !== action.value),
        };
      }
      if (action.key === "easyApply") return { ...state, easyApply: false };
      if (action.key === "minSalary") return { ...state, minSalary: "" };
      return { ...state, [action.key]: "" };
    }
    case "CLEAR_ALL":
      return { ...INITIAL_JOB_FILTERS };
    case "APPLY_TEMPLATE":
      return { ...action.filters };
    default:
      return state;
  }
}

function referralFilterReducer(state, action) {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, [action.key]: action.value };
    case "TOGGLE_CHIP": {
      const arr = state[action.key];
      return {
        ...state,
        [action.key]: arr.includes(action.value)
          ? arr.filter((v) => v !== action.value)
          : [...arr, action.value],
      };
    }
    case "REMOVE_FILTER": {
      const current = state[action.key];
      if (Array.isArray(current)) {
        return {
          ...state,
          [action.key]: current.filter((v) => v !== action.value),
        };
      }
      return { ...state, [action.key]: "" };
    }
    case "CLEAR_ALL":
      return { ...INITIAL_REFERRAL_FILTERS };
    default:
      return state;
  }
}

export default function LinkedInSearchPage() {
  const [activeTab, setActiveTab] = useState("search");
  const [jobFilters, jobDispatch] = useReducer(jobFilterReducer, INITIAL_JOB_FILTERS);
  const [referralFilters, referralDispatch] = useReducer(
    referralFilterReducer,
    INITIAL_REFERRAL_FILTERS
  );

  const filters = activeTab === "search" ? jobFilters : referralFilters;
  const dispatch = activeTab === "search" ? jobDispatch : referralDispatch;

  const url = useLinkedInURL(filters, activeTab);
  const { builtInTemplates, customTemplates, saveTemplate, removeTemplate } = useTemplates();
  const allTemplates = useMemo(
    () => [...builtInTemplates, ...customTemplates],
    [builtInTemplates, customTemplates]
  );

  const isEmpty = useMemo(() => {
    if (activeTab === "search") {
      return (
        !jobFilters.keywords &&
        !jobFilters.location &&
        !jobFilters.timePosted &&
        !jobFilters.sortBy &&
        !jobFilters.workMode.length &&
        !jobFilters.jobType.length &&
        !jobFilters.experienceLevel.length &&
        !jobFilters.easyApply &&
        !jobFilters.minSalary
      );
    }
    return (
      !referralFilters.company &&
      !referralFilters.role &&
      !referralFilters.connectionDegree.length &&
      !referralFilters.location
    );
  }, [activeTab, jobFilters, referralFilters]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const decoded = decodeFiltersFromHash(hash);
    if (!decoded) return;
    setActiveTab(decoded.tab || "search");
    if (decoded.tab === "referral") {
      referralDispatch({ type: "CLEAR_ALL" });
      Object.entries(decoded.filters).forEach(([key, value]) => {
        referralDispatch({ type: "SET_FILTER", key, value });
      });
    } else {
      jobDispatch({ type: "APPLY_TEMPLATE", filters: { ...INITIAL_JOB_FILTERS, ...decoded.filters } });
    }
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const ref = SearchBuilder.keywordsRef;
        if (ref?.current) ref.current.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        if (!isEmpty) navigator.clipboard?.writeText(url);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [url, isEmpty]);

  const handleApplyTemplate = useCallback(
    (template) => {
      setActiveTab("search");
      jobDispatch({ type: "APPLY_TEMPLATE", filters: template.filters });
    },
    []
  );

  const handleSaveTemplate = useCallback(
    (name) => {
      saveTemplate(name, jobFilters);
    },
    [saveTemplate, jobFilters]
  );

  const handleShare = useCallback(() => {
    const hash = encodeFiltersToHash(filters, activeTab);
    return `${window.location.origin}${window.location.pathname}#${hash}`;
  }, [filters, activeTab]);

  const tabs = [
    { id: "search", label: "Job Search", icon: Briefcase },
    { id: "referral", label: "Referral Finder", icon: Users },
  ];

  const fadeUp = shouldAnimate
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: {}, animate: {} };

  return (
    <>
      <Head>
        <title>LinkedIn Job Search URL Builder | CareersAt.Tech</title>
        <meta
          name="description"
          content="Build optimized LinkedIn job search URLs with smart filters. Find jobs faster with pre-built templates for Indian freshers and early-career professionals."
        />
      </Head>

      <Navbar />

      <main
        id="main-content"
        className="min-h-screen pb-20 md:pb-12"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #EEF2FF 0%, #F9FAFB 70%)" }}
      >
        {/* Hero */}
        <div className="max-w-content mx-auto px-4 lg:px-6 pt-24 sm:pt-28">
          <div className="max-w-[680px] mx-auto text-center mb-10">
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.3 }}
              className="text-[11px] font-dm font-semibold uppercase tracking-[0.1em] text-primary mb-5"
            >
              Smart Search Builder
            </motion.p>
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="font-serif-display font-normal text-text-primary mb-5"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Build your perfect
              <br />
              LinkedIn search.
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-base font-dm text-gray-500 max-w-[480px] mx-auto mb-4 leading-relaxed"
            >
              Craft optimized search URLs with smart filters.
              No sign-in required.
            </motion.p>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="text-xs font-dm text-gray-400"
            >
              <kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-white text-[10px] font-mono text-gray-500">
                {typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent) ? "⌘" : "Ctrl"}+K
              </kbd>{" "}
              to focus search &middot;{" "}
              <kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-white text-[10px] font-mono text-gray-500">
                {typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent) ? "⌘" : "Ctrl"}+⇧+C
              </kbd>{" "}
              to copy URL
            </motion.p>
          </div>
        </div>

        {/* Two-column workspace */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="max-w-content mx-auto px-4 lg:px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
            {/* Left Column: Filters */}
            <div>
              {/* Tabs — underline style */}
              <div className="flex gap-0 border-b border-gray-200 mb-5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-3 text-sm font-dm font-semibold transition-colors cursor-pointer focus:outline-none ${
                      activeTab === tab.id
                        ? "text-primary"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    <tab.icon size={15} />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Templates (job search only) */}
              {activeTab === "search" && (
                <div className="mb-4">
                  <TemplateBar
                    templates={allTemplates}
                    onApply={handleApplyTemplate}
                    onSave={handleSaveTemplate}
                    onRemove={removeTemplate}
                    hasActiveFilters={!isEmpty}
                  />
                </div>
              )}

              {/* Active Filters */}
              {!isEmpty && (
                <div className="mb-4">
                  <ActiveFiltersBar
                    filters={filters}
                    tab={activeTab}
                    onRemoveFilter={(key, value) =>
                      dispatch({ type: "REMOVE_FILTER", key, value })
                    }
                    onClearAll={() => dispatch({ type: "CLEAR_ALL" })}
                  />
                </div>
              )}

              {/* Filter Content */}
              {activeTab === "search" ? (
                <SearchBuilder filters={jobFilters} dispatch={jobDispatch} />
              ) : (
                <ReferralFinder filters={referralFilters} dispatch={referralDispatch} />
              )}
            </div>

            {/* Right Column: Dark Preview Panel */}
            <motion.div
              {...(shouldAnimate
                ? { initial: { opacity: 0, y: 20, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 } }
                : { initial: {}, animate: {} }
              )}
              transition={{ duration: 0.35, delay: 0.35 }}
              className="lg:sticky lg:top-20 lg:self-start rounded-2xl p-6 space-y-5"
              style={{ background: "#1A1A2E" }}
            >
              {/* Summary */}
              <HumanReadableSummary filters={filters} tab={activeTab} />

              {/* URL Preview */}
              <URLPreview url={url} isEmpty={isEmpty} onShare={isEmpty ? null : handleShare} />

              {/* Cross-link to CareersAt.Tech jobs */}
              <div className="p-4 rounded-lg bg-white/[0.06] border border-white/10 text-center">
                <p className="text-sm font-dm text-gray-400 mb-2">
                  Also check CareersAt.Tech for verified listings
                </p>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1.5 text-sm font-dm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Browse jobs <ArrowRight size={14} />
                </Link>
              </div>

              {/* Disclaimer */}
              <p className="text-center text-[11px] font-dm text-gray-600">
                Not affiliated with LinkedIn Corporation. This tool generates URLs only — no data is collected.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <FooterNew />
    </>
  );
}
