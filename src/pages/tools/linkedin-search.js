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

  // Load from URL hash on mount
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
    // Clean hash after loading
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K: focus keywords
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const ref = SearchBuilder.keywordsRef;
        if (ref?.current) ref.current.focus();
      }
      // Cmd/Ctrl + Shift + C: copy URL
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
        className="min-h-screen bg-linkedin-bg pt-20 pb-28 md:pb-12"
      >
        <div className="max-w-2xl mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-8">
            <h1 className="font-serif-display text-3xl md:text-4xl text-linkedin-charcoal mb-2">
              LinkedIn Search Builder
            </h1>
            <p className="font-dm text-sm text-linkedin-muted max-w-md mx-auto">
              Build the perfect LinkedIn job search URL with smart filters.
              No sign-in required.
            </p>
            <p className="font-dm text-xs text-linkedin-muted/60 mt-1">
              <kbd className="px-1.5 py-0.5 rounded border border-linkedin-border text-[10px] font-mono">
                {typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent) ? "⌘" : "Ctrl"}+K
              </kbd>{" "}
              to focus search &middot;{" "}
              <kbd className="px-1.5 py-0.5 rounded border border-linkedin-border text-[10px] font-mono">
                {typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent) ? "⌘" : "Ctrl"}+⇧+C
              </kbd>{" "}
              to copy URL
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-white rounded-lg shadow-linkedin-card p-1 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-dm font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "text-linkedin-accent"
                    : "text-linkedin-muted hover:text-linkedin-charcoal"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 bg-linkedin-accent-light rounded-md -z-10"
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

          {/* Summary */}
          <div className="mt-4">
            <HumanReadableSummary filters={filters} tab={activeTab} />
          </div>

          {/* URL Preview */}
          <div className="mt-4">
            <URLPreview url={url} isEmpty={isEmpty} onShare={isEmpty ? null : handleShare} />
          </div>

          {/* Cross-link to CareersAt.Tech jobs */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-linkedin-card text-center">
            <p className="font-dm text-sm text-linkedin-muted mb-2">
              Also check CareersAt.Tech for verified listings matching your search
            </p>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-sm font-dm font-medium text-linkedin-accent hover:text-linkedin-accent-hover transition-colors"
            >
              Browse jobs on CareersAt.Tech <ArrowRight size={14} />
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-center text-xs font-dm text-linkedin-muted/50">
            Not affiliated with LinkedIn Corporation. This tool generates URLs only — no data is collected or sent to any server.
          </p>
        </div>
      </main>

      <FooterNew />
    </>
  );
}

