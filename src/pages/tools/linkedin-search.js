import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Head from "next/head";
import { CheckCircle2, Zap, Share2, Search, Users, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Redesign/Navbar";
import FooterNew from "@/components/Redesign/FooterNew";
import JobForm from "@/components/LinkedInSearch/JobForm";
import ReferralForm from "@/components/LinkedInSearch/ReferralForm";
import OutputPanel from "@/components/LinkedInSearch/OutputPanel";
import TemplateBar from "@/components/LinkedInSearch/TemplateBar";
import ActiveFiltersBar from "@/components/LinkedInSearch/ActiveFiltersBar";
import {
  HowItWorks,
  ModeExplainer,
  FAQ,
  ClosingCTA,
} from "@/components/LinkedInSearch/ContentSections";
import useTemplates from "@/components/LinkedInSearch/hooks/useTemplates";
import { emptyState } from "@/components/LinkedInSearch/lib/linkedin-params";
import { TEMPLATES } from "@/components/LinkedInSearch/lib/templates";
import {
  buildUrl,
  summary as buildSummary,
  isEmpty as stateIsEmpty,
  activeChips,
  clearActive,
  hydrateState,
  encode,
  decode,
} from "@/components/LinkedInSearch/lib/url-builder";

const LS_STATE = "cb_state_v1";
const WRAP = "w-full max-w-[1500px] mx-auto px-4 lg:px-10";

// clipboard helper (async API with execCommand fallback)
function copyText(text) {
  return new Promise((resolve) => {
    const fallback = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch {
        return false;
      }
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => resolve(true))
        .catch(() => resolve(fallback()));
    } else {
      resolve(fallback());
    }
  });
}

// LinkedIn brand glyph (lucide ships no brand icons; inline the mark)
const LinkedinGlyph = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 448 512"
    fill="currentColor"
    aria-hidden="true"
    className="shrink-0"
  >
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
  </svg>
);

export default function LinkedInSearchPage() {
  const [state, setState] = useState(emptyState);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);

  const { presets, savePreset, removePreset } = useTemplates();
  const keywordsRef = useRef(null);
  const companyRef = useRef(null);
  const toolRef = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const url = useMemo(() => buildUrl(state), [state]);
  const summary = useMemo(() => buildSummary(state), [state]);
  const empty = useMemo(() => stateIsEmpty(state), [state]);
  const chips = useMemo(() => activeChips(state), [state]);
  const builtins = useMemo(() => TEMPLATES.filter((t) => t.mode === state.mode), [state.mode]);

  // hydrate from #cfg hash (wins) else localStorage — on mount only (SSR-safe)
  useEffect(() => {
    const fromHash = decode(window.location.hash);
    if (fromHash) {
      setState(fromHash);
      return;
    }
    try {
      const raw = localStorage.getItem(LS_STATE);
      if (raw) setState(hydrateState(JSON.parse(raw)));
    } catch {
      /* ignore */
    }
  }, []);

  // persist + reset the copied state on any change
  useEffect(() => {
    try {
      localStorage.setItem(LS_STATE, JSON.stringify(state));
    } catch {
      /* ignore */
    }
    setCopied(false);
  }, [state]);

  const showToast = useCallback((msg, ok = true) => {
    setToast({ msg, ok });
    clearTimeout(window.__cbToast);
    window.__cbToast = setTimeout(() => setToast(null), 2200);
  }, []);

  const doCopy = useCallback(() => {
    const s = stateRef.current;
    if (stateIsEmpty(s)) return;
    copyText(buildUrl(s)).then((ok) => {
      if (ok) {
        setCopied(true);
        showToast("LinkedIn URL copied to clipboard");
        setTimeout(() => setCopied(false), 1800);
      } else {
        showToast("Couldn’t copy — select & copy manually", false);
      }
    });
  }, [showToast]);

  const doShare = useCallback(() => {
    const s = stateRef.current;
    const hash = `#${encode(s)}`;
    const link = window.location.origin + window.location.pathname + hash;
    try {
      window.history.replaceState(null, "", hash);
    } catch {
      /* ignore */
    }
    copyText(link).then((ok) =>
      showToast(ok ? "Shareable config link copied" : "Couldn’t copy link", ok)
    );
  }, [showToast]);

  // keyboard shortcuts: ⌘/Ctrl+K focus keywords/company, ⌘/Ctrl+⇧+C copy URL
  useEffect(() => {
    const onKey = (e) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && !e.shiftKey && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        const el = stateRef.current.mode === "job" ? keywordsRef.current : companyRef.current;
        if (el) el.focus();
      } else if (meta && e.shiftKey && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        doCopy();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doCopy]);

  const setMode = (mode) => setState((s) => ({ ...s, mode }));
  const setJob = (patch) => setState((s) => ({ ...s, job: { ...s.job, ...patch } }));
  const setReferral = (patch) => setState((s) => ({ ...s, referral: { ...s.referral, ...patch } }));

  const handleSavePreset = () => {
    if (stateIsEmpty(state)) {
      showToast("Set a few filters first", false);
      return;
    }
    const name = window.prompt(
      "Name this preset",
      state.mode === "job" ? "My job search" : "My referral search"
    );
    if (!name) return;
    savePreset(name, state);
    showToast("Preset saved");
  };

  const focusTool = (mode) => {
    setMode(mode);
    const el = toolRef.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 16;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  };

  const tabs = [
    { id: "job", label: "Job Search", Icon: Search },
    { id: "referral", label: "Referral Finder", Icon: Users },
  ];

  return (
    <>
      <Head>
        <title>LinkedIn Job Search URL Builder | CareersAt.Tech</title>
        <meta
          name="description"
          content="Free LinkedIn search URL builder for Indian tech freshers. Pick your filters, copy the link, and open LinkedIn already filtered to the right jobs — or find someone to ask for a referral. No login, no tracking."
        />
        <link rel="canonical" href="https://careersat.tech/tools/linkedin-search" />
      </Head>

      <Navbar />

      <main id="main-content" className="bg-white text-cat-ink tracking-[0.14px]">
        {/* Hero */}
        <section className="bg-cat-hero border-b border-cat-border">
          <div className={`${WRAP} pt-24 pb-10 md:pt-28 md:pb-12`}>
            <span className="inline-flex items-center gap-2 mb-[18px] px-3 py-1.5 rounded-full text-[13px] font-medium text-cat-primary bg-cat-blue-bg border border-cat-border-soft">
              <LinkedinGlyph />
              Free LinkedIn search URL builder
            </span>
            <h1 className="text-[28px] md:text-[38px] font-medium leading-[1.3] tracking-[0.4px] text-cat-ink mb-3.5 [text-wrap:balance]">
              Stop re-typing filters.{" "}
              <span className="text-cat-primary font-semibold">
                Build the LinkedIn search URL
              </span>{" "}
              once and land on exactly the right jobs.
            </h1>
            <p className="text-[16px] text-cat-fg-muted leading-normal mb-[22px]">
              Pick your filters here, copy the link, and open LinkedIn already filtered to the roles
              you want — or find the right person to ask for a referral. Made for India’s tech
              freshers.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { Icon: CheckCircle2, label: "No login or signup" },
                { Icon: Zap, label: "URL updates live" },
                { Icon: Share2, label: "Share a search in one tap" },
              ].map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] font-medium text-cat-fg bg-white border border-cat-border"
                >
                  <c.Icon size={12} aria-hidden="true" className="text-cat-primary" />
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Two-column tool */}
        <div ref={toolRef} className={`${WRAP} pt-[22px] pb-12 lg:pt-8 lg:pb-16`}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-[22px] lg:gap-9 items-start">
            {/* Left: tabs + templates + active filters + form */}
            <div>
              <div
                role="tablist"
                aria-label="Search mode"
                className="flex w-full sm:inline-flex sm:w-auto gap-1 p-1 mb-[22px] bg-cat-surface-soft border border-cat-border rounded-[10px]"
              >
                {tabs.map((t) => {
                  const selected = state.mode === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setMode(t.id)}
                      className={`flex-1 sm:flex-none justify-center min-h-[40px] px-[18px] inline-flex items-center gap-2 rounded-[8px] text-[14px] font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cat-primary/20 ${
                        selected
                          ? "bg-white text-cat-primary shadow-cat-xs"
                          : "text-cat-fg-dim hover:text-cat-fg"
                      }`}
                    >
                      <t.Icon size={13} aria-hidden="true" />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              <div className="mb-[22px]">
                <TemplateBar
                  templates={builtins}
                  presets={presets}
                  onApply={(tpl) => setState(tpl.state())}
                  onApplyPreset={(p) => setState(hydrateState(p.state))}
                  onSavePreset={handleSavePreset}
                  onRemovePreset={removePreset}
                />
              </div>

              {chips.length > 0 && (
                <div className="mb-[22px]">
                  <ActiveFiltersBar
                    chips={chips}
                    onApply={(c) => setState(c.apply())}
                    onClearAll={() => setState(clearActive(state))}
                  />
                </div>
              )}

              {state.mode === "job" ? (
                <JobForm job={state.job} set={setJob} keywordsRef={keywordsRef} />
              ) : (
                <ReferralForm referral={state.referral} set={setReferral} companyRef={companyRef} />
              )}
            </div>

            {/* Right: sticky output */}
            <OutputPanel
              state={state}
              url={url}
              summary={summary}
              empty={empty}
              onCopy={doCopy}
              onShare={doShare}
              copied={copied}
            />
          </div>
        </div>

        {/* Content band */}
        <div className="bg-cat-surface-soft border-t border-cat-border">
          <div className={WRAP}>
            <HowItWorks />
            <ModeExplainer onPick={focusTool} />
            <FAQ />
            <ClosingCTA onStart={() => focusTool(state.mode)} />
          </div>
        </div>
      </main>

      <FooterNew />

      {/* Toast */}
      <div
        className={`fixed left-1/2 bottom-7 -translate-x-1/2 z-[90] inline-flex items-center gap-[9px] px-[18px] py-3 rounded-full bg-cat-ink text-white text-[13px] font-medium shadow-cat-card-hover transition-all duration-200 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            {toast.ok ? (
              <CheckCircle2 size={15} aria-hidden="true" className="text-cat-success" />
            ) : (
              <AlertTriangle size={15} aria-hidden="true" className="text-[#ff3b30]" />
            )}
            {toast.msg}
          </>
        )}
      </div>
    </>
  );
}
