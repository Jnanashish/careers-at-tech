import React, { useState } from "react";
import {
  SlidersHorizontal,
  Link2,
  ExternalLink,
  Search,
  Users,
  ArrowRight,
  ArrowUp,
} from "lucide-react";

const EYEBROW = "text-[10px] font-semibold tracking-[1px] uppercase text-cat-fg-hint";
const SEC = "py-9 md:py-12 border-b border-cat-border last:border-b-0";
const SEC_H2 =
  "text-[26px] md:text-[32px] font-semibold leading-tight tracking-[0.2px] text-cat-ink m-0 max-w-[640px] [text-wrap:balance]";

const SectionHead = ({ eyebrow, children }) => (
  <div className="mb-[26px]">
    <p className={`${EYEBROW} mb-2.5`}>{eyebrow}</p>
    <h2 className={SEC_H2}>{children}</h2>
  </div>
);

export function HowItWorks() {
  const steps = [
    {
      n: 1,
      Icon: SlidersHorizontal,
      title: "Set your filters",
      body: "Pick keywords, location, work mode, experience level and more. Your LinkedIn URL builds itself as you type — no guesswork.",
    },
    {
      n: 2,
      Icon: Link2,
      title: "Copy the link",
      body: "One tap copies a ready-to-use search URL. Or hit share to pack your filters into a link you can send to a friend.",
    },
    {
      n: 3,
      Icon: ExternalLink,
      title: "Land on LinkedIn, pre-filtered",
      body: "Open it and you drop straight into LinkedIn — already filtered to those exact roles. No re-typing filters every time.",
    },
  ];
  return (
    <section className={SEC}>
      <SectionHead eyebrow="How it works">
        Three steps from <span className="text-cat-primary">filters</span> to the right results.
      </SectionHead>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
        {steps.map((s) => (
          <div key={s.n} className="bg-white border border-cat-border rounded-[14px] p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[30px] font-semibold text-cat-primary leading-none tracking-[0.5px]">
                {s.n}
              </span>
              <span className="w-10 h-10 rounded-[8px] bg-cat-blue-bg text-cat-primary flex items-center justify-center">
                <s.Icon size={15} aria-hidden="true" />
              </span>
            </div>
            <h3 className="text-[18px] font-semibold text-cat-ink mb-2">{s.title}</h3>
            <p className="text-[14px] leading-normal text-cat-fg-muted m-0 [text-wrap:pretty]">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ModeExplainer({ onPick }) {
  const cards = [
    {
      Icon: Search,
      title: "Job Search",
      mode: "job",
      cta: "Build a job search",
      body: (
        <>
          Build a LinkedIn <strong className="text-cat-fg font-semibold">jobs</strong> search.
          Filter by role, location, time posted, work mode, job type, experience, Easy Apply and
          more — then land on a pre-filtered jobs feed.
        </>
      ),
    },
    {
      Icon: Users,
      title: "Referral Finder",
      mode: "referral",
      cta: "Find referrers",
      body: (
        <>
          Build a LinkedIn <strong className="text-cat-fg font-semibold">people</strong> search to
          find who can refer you. Target a company and role, then narrow by connection degree so you
          focus on warm, 2nd-degree intros.
        </>
      ),
    },
  ];
  return (
    <section className={SEC}>
      <SectionHead eyebrow="Two ways to use it">
        Find the job — or find someone to <span className="text-cat-primary">refer you</span>.
      </SectionHead>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
        {cards.map((c) => (
          <div
            key={c.mode}
            className="bg-white border border-cat-border rounded-[14px] p-7 transition-colors hover:border-cat-primary-light hover:shadow-cat-card-hover"
          >
            <span className="w-[46px] h-[46px] rounded-[10px] bg-cat-blue-bg text-cat-primary flex items-center justify-center mb-4">
              <c.Icon size={18} aria-hidden="true" />
            </span>
            <h3 className="text-[19px] font-semibold text-cat-ink mb-2.5">{c.title}</h3>
            <p className="text-[14px] leading-loose text-cat-fg-muted mb-[18px] [text-wrap:pretty]">
              {c.body}
            </p>
            <button
              type="button"
              onClick={() => onPick(c.mode)}
              className="group inline-flex items-center gap-[9px] text-[14px] font-semibold text-cat-primary cursor-pointer focus:outline-none"
            >
              {c.cta}
              <ArrowRight
                size={12}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FAQ() {
  const items = [
    {
      q: "Is this really free?",
      a: "Yes — completely free. No signup, no paywall, and no hidden cost. The tool just builds a URL in your browser; nothing is sent to or stored on a server.",
    },
    {
      q: "Do I need to log in to use it?",
      a: "Not for the builder. You set filters and copy a link with no account at all. When you open that link, LinkedIn itself will ask you to log in as usual to view the results.",
    },
    {
      q: "Do you track me or save my searches?",
      a: "No tracking, no analytics on your filters. Everything lives in your own browser. The “Share” button is the only time your filters leave your device — and only into a link that you choose to send.",
    },
    {
      q: "What is the Referral Finder for?",
      a: "It builds a LinkedIn people-search to find employees at a company you’re targeting — the people best placed to refer you. Filtering by connection degree helps you focus on 2nd-degree contacts, where a warm intro is most likely.",
    },
    {
      q: "Why can’t I filter by salary in rupees?",
      a: "LinkedIn’s job-search URLs don’t support an Indian-rupee minimum-salary filter. Rather than break the link, we show your minimum in the plain-English summary so you still have it on hand.",
    },
    {
      q: "Will these filters always work?",
      a: "They use LinkedIn’s public search parameters, the same ones the site uses. If LinkedIn ever changes a parameter, that single filter may be ignored — but the core keyword, location and date filters are stable and widely used.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className={SEC}>
      <SectionHead eyebrow="Good to know">Frequently asked questions</SectionHead>
      <div className="max-w-[760px]">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`bg-white border rounded-[10px] mb-3 overflow-hidden transition-colors ${
                isOpen ? "border-cat-primary-light" : "border-cat-border"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-[18px] min-h-[44px] text-left text-[14px] font-medium text-cat-ink cursor-pointer focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cat-primary/20"
              >
                <span>{it.q}</span>
                <span
                  aria-hidden="true"
                  className={`flex-none text-[22px] font-normal leading-none text-cat-primary transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-out"
                style={{ maxHeight: isOpen ? 260 : 0 }}
              >
                <p className="m-0 px-5 pb-5 text-[14px] leading-loose text-cat-fg-muted [text-wrap:pretty]">
                  {it.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ClosingCTA({ onStart }) {
  return (
    <div className="text-center py-10 md:py-13">
      <h2 className="text-[24px] md:text-[32px] font-semibold tracking-[0.2px] text-cat-ink mb-3">
        Build your search now — it’s free.
      </h2>
      <p className="text-[16px] text-cat-fg-muted mb-6">
        No signup, no paywall, no tracking. Just a URL that works.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center justify-center gap-[9px] px-7 min-h-[48px] rounded-[8px] bg-cat-primary text-white text-[14px] font-semibold transition-colors hover:bg-cat-primary-hover cursor-pointer focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cat-primary/20"
      >
        Start building <ArrowUp size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
