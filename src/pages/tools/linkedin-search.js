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

const PAPER_GRID = {
  backgroundImage:
    "radial-gradient(rgba(61,51,46,0.14) 1px, transparent 1px), linear-gradient(rgba(217,207,191,0.35) 1px, transparent 1px)",
  backgroundSize: "24px 24px, 100% 40px",
  backgroundPosition: "0 0, 0 0",
};

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
    { id: "search", label: "Job Search", icon: Briefcase, numeral: "01" },
    { id: "referral", label: "Referral Finder", icon: Users, numeral: "02" },
  ];

  const fadeUp = shouldAnimate
    ? { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }
    : { initial: {}, animate: {} };

  const isMac =
    typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent);

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
        className="relative min-h-screen pb-20 md:pb-12 bg-linkedin-bg text-linkedin-ink overflow-hidden"
      >
        {/* Paper grain: dot-grid + faint horizontal rule */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={PAPER_GRID}
        />
        {/* Top torn-paper edge decoration */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 14"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-0 left-0 w-full h-3 text-linkedin-rule"
        >
          <path
            d="M0,0 L0,8 L40,4 L90,10 L140,5 L200,9 L260,3 L320,8 L390,5 L460,10 L530,4 L600,9 L670,5 L740,10 L820,4 L900,9 L970,5 L1050,10 L1120,4 L1200,8 L1200,0 Z"
            fill="currentColor"
            opacity="0.55"
          />
        </svg>
        {/* Soft atmospheric vignette at top center */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(201,155,60,0.18) 0%, rgba(199,91,63,0.05) 40%, transparent 70%)",
          }}
        />

        {/* Hero */}
        <div className="relative max-w-content mx-auto px-4 lg:px-6 pt-24 sm:pt-28">
          <div className="max-w-[720px] mx-auto text-center mb-12">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.32 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 items-center justify-center rounded-[3px] bg-linkedin-accent text-linkedin-surface font-mono-proof text-[10px] font-bold leading-none shadow-letterpress-inset"
              >
                ¶
              </span>
              <span className="text-[11px] font-mono-proof font-semibold uppercase tracking-[0.22em] text-linkedin-accent">
                Press &amp; Proof &middot; Issue 04
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.36, delay: 0.06 }}
              className="font-serif-display font-normal text-linkedin-ink mb-5 tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
              }}
            >
              Typeset your <em className="text-linkedin-accent italic">perfect</em>
              <br />
              LinkedIn <em className="italic text-linkedin-ink-soft">search</em>,
              <br />
              one param at a time.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.32, delay: 0.16 }}
              className="font-sans-linkedin text-[1.0625rem] text-linkedin-ink-soft max-w-[520px] mx-auto mb-6 leading-relaxed"
            >
              A letterpress URL builder. Pick keywords, ink the filters, pull a clean
              proof — then take it to LinkedIn. No sign-in. No tracking.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.32, delay: 0.24 }}
              className="inline-flex items-center gap-3 font-mono-proof text-[11px] text-linkedin-ink-soft"
            >
              <span className="inline-flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded-[4px] bg-linkedin-surface border border-linkedin-rule shadow-letterpress-inset text-linkedin-ink">
                  {isMac ? "⌘" : "Ctrl"}
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded-[4px] bg-linkedin-surface border border-linkedin-rule shadow-letterpress-inset text-linkedin-ink">
                  K
                </kbd>
                <span className="text-linkedin-muted">focus keywords</span>
              </span>
              <span aria-hidden="true" className="text-linkedin-rule">
                /
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded-[4px] bg-linkedin-surface border border-linkedin-rule shadow-letterpress-inset text-linkedin-ink">
                  {isMac ? "⌘" : "Ctrl"}
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded-[4px] bg-linkedin-surface border border-linkedin-rule shadow-letterpress-inset text-linkedin-ink">
                  ⇧
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded-[4px] bg-linkedin-surface border border-linkedin-rule shadow-letterpress-inset text-linkedin-ink">
                  C
                </kbd>
                <span className="text-linkedin-muted">pull a proof</span>
              </span>
            </motion.div>
          </div>
        </div>

        {/* Two-column workspace */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="relative max-w-content mx-auto px-4 lg:px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 lg:gap-8">
            {/* Left Column: Composing stick */}
            <div>
              {/* Tabs — typeset numerals + terracotta underline */}
              <div className="relative mb-6">
                <div className="flex gap-0 border-b border-linkedin-rule">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-end gap-2 px-4 sm:px-5 pb-3 pt-2 font-sans-linkedin font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-linkedin-accent focus-visible:ring-offset-2 focus-visible:ring-offset-linkedin-bg ${
                        activeTab === tab.id
                          ? "text-linkedin-ink"
                          : "text-linkedin-muted hover:text-linkedin-ink-soft"
                      }`}
                    >
                      <span className="font-mono-proof text-[11px] tracking-[0.08em] opacity-70">
                        {tab.numeral}
                      </span>
                      <tab.icon size={14} className="mb-[1px]" />
                      <span className="text-[14px]">{tab.label}</span>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="tab-underline"
                          className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-linkedin-accent"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Templates (job search only) */}
              {activeTab === "search" && (
                <div className="mb-5">
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
                <div className="mb-5">
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

            {/* Right Column: Proof press */}
            <motion.aside
              {...(shouldAnimate
                ? {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                  }
                : { initial: {}, animate: {} })}
              transition={{ duration: 0.42, delay: 0.4 }}
              className="lg:sticky lg:top-20 lg:self-start"
            >
              <div className="relative rounded-[14px] bg-linkedin-proof-bg text-linkedin-bg shadow-proof-panel border border-linkedin-proof-rule overflow-hidden">
                {/* Proof panel masthead */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-linkedin-proof-rule bg-gradient-to-b from-[#221B18] to-[#1A1614]">
                  <div className="flex items-center gap-2">
                    <span className="flex gap-1" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-linkedin-accent/80" />
                      <span className="h-2 w-2 rounded-full bg-linkedin-highlight/70" />
                      <span className="h-2 w-2 rounded-full bg-linkedin-rule/40" />
                    </span>
                    <span className="font-mono-proof text-[10px] uppercase tracking-[0.22em] text-linkedin-rule/80">
                      Proof Press
                    </span>
                  </div>
                  <span className="font-mono-proof text-[10px] uppercase tracking-[0.22em] text-linkedin-muted">
                    {activeTab === "search" ? "Plate · 01" : "Plate · 02"}
                  </span>
                </div>

                <div className="p-5 space-y-5">
                  <HumanReadableSummary filters={filters} tab={activeTab} />
                  <URLPreview url={url} isEmpty={isEmpty} onShare={isEmpty ? null : handleShare} />

                  {/* Cross-link */}
                  <div className="px-4 py-3 rounded-[10px] bg-linkedin-proof-surface border border-linkedin-proof-rule text-center">
                    <p className="font-sans-linkedin text-[13px] text-linkedin-muted mb-1.5">
                      Also browse verified listings at CareersAt.Tech
                    </p>
                    <Link
                      href="/jobs"
                      className="inline-flex items-center gap-1.5 font-sans-linkedin text-[13px] font-medium text-linkedin-highlight hover:text-linkedin-bg transition-colors group"
                    >
                      Open the job board
                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>

                  <p className="text-center font-mono-proof text-[10px] uppercase tracking-[0.22em] text-linkedin-muted">
                    Not affiliated with LinkedIn · URL builder only · no data collected
                  </p>
                </div>
              </div>
            </motion.aside>
          </div>
        </motion.div>
      </main>

      <FooterNew />
    </>
  );
}
