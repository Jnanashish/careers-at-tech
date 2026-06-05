import React from "react";
import Link from "next/link";
import {
  Zap,
  SlidersHorizontal,
  Users,
  Check,
  Link2,
  Share2,
  ExternalLink,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { PrettyUrl } from "./FormControls";

const OutputPanel = ({ state, url, summary, empty, onCopy, onShare, copied }) => {
  const isJob = state.mode === "job";

  return (
    <div className="lg:sticky lg:top-5">
      <div className="bg-white border border-cat-border rounded-[14px] overflow-hidden">
        {/* header */}
        <div className="flex items-center gap-[9px] px-5 py-4 border-b border-cat-border">
          <span
            aria-hidden="true"
            className={`w-2 h-2 rounded-full ${
              empty
                ? "bg-cat-fg-hint shadow-[0_0_0_3px_#f3f4f6]"
                : "bg-cat-success shadow-[0_0_0_3px_rgba(37,211,102,0.22)]"
            }`}
          />
          <h3 className="text-[14px] font-semibold text-cat-ink m-0">
            {isJob ? "Your LinkedIn jobs search" : "Your LinkedIn people search"}
          </h3>
          <span className="ml-auto inline-flex items-center gap-[5px] text-[10px] text-cat-fg-hint">
            {empty ? (
              "waiting"
            ) : (
              <>
                <Zap size={11} aria-hidden="true" />
                live
              </>
            )}
          </span>
        </div>

        <div className="p-5">
          {empty ? (
            <div className="text-center pt-[18px] px-2 pb-2">
              <div className="w-14 h-14 rounded-full bg-cat-blue-bg text-cat-primary flex items-center justify-center mx-auto mb-3.5">
                {isJob ? <SlidersHorizontal size={20} /> : <Users size={20} />}
              </div>
              <h4 className="text-[16px] font-semibold text-cat-ink mb-1.5">No filters yet</h4>
              <p className="text-[13px] text-cat-fg-dim leading-normal max-w-[260px] mx-auto">
                {isJob
                  ? "Pick a few filters on the left — or tap a template — and your ready-to-click LinkedIn URL builds here."
                  : "Add a company or role on the left and we’ll build a people-search link to find referrers."}
              </p>
            </div>
          ) : (
            <>
              <p className="text-[10px] font-semibold tracking-[0.8px] uppercase text-cat-fg-hint mb-2">
                In plain English
              </p>
              <p className="text-[18px] leading-normal font-medium text-cat-ink mb-[18px] min-h-[24px] [text-wrap:pretty]">
                {summary}
              </p>

              <div className="bg-cat-surface-soft border border-cat-border rounded-[8px] px-[14px] py-[13px] mb-[14px]">
                <div className="font-mono text-[12px] leading-[1.55] text-cat-fg break-all max-h-[132px] overflow-auto no-scrollbar">
                  <PrettyUrl url={url} />
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-[10px]">
                <button
                  type="button"
                  onClick={onCopy}
                  className={`inline-flex items-center justify-center gap-[9px] min-h-[48px] rounded-[8px] border text-[14px] font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cat-primary/20 ${
                    copied
                      ? "bg-cat-success border-cat-success text-white"
                      : "bg-cat-primary border-cat-primary text-white hover:bg-cat-primary-hover hover:border-cat-primary-hover"
                  }`}
                >
                  {copied ? <Check size={15} aria-hidden="true" /> : <Link2 size={15} aria-hidden="true" />}
                  {copied ? "Copied!" : "Copy URL"}
                </button>
                <button
                  type="button"
                  onClick={onShare}
                  aria-label="Copy a shareable config link"
                  title="Share this config"
                  className="w-12 min-h-[48px] inline-flex items-center justify-center rounded-[8px] bg-white border border-cat-border text-cat-fg transition-colors cursor-pointer hover:border-cat-primary-light hover:text-cat-primary hover:bg-cat-blue-bg focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cat-primary/20"
                >
                  <Share2 size={15} aria-hidden="true" />
                </button>
              </div>

              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[10px] w-full min-h-[48px] inline-flex items-center justify-center gap-[9px] rounded-[8px] bg-white text-cat-primary border border-cat-primary-light text-[14px] font-semibold transition-colors hover:bg-cat-blue-bg focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cat-primary/20"
              >
                Open on LinkedIn <ExternalLink size={13} aria-hidden="true" />
              </a>
            </>
          )}

          {/* always-visible cross-link to the job board */}
          <Link
            href="/jobs"
            className="group flex items-center gap-3 px-4 py-3.5 mt-[14px] border border-cat-border rounded-[10px] transition-colors hover:border-cat-primary-light hover:bg-cat-blue-bg"
          >
            <span className="flex-none w-[38px] h-[38px] rounded-[8px] bg-cat-blue-bg text-cat-primary flex items-center justify-center">
              <Briefcase size={16} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <strong className="block text-[14px] font-medium text-cat-ink">
                Browse verified jobs instead
              </strong>
              <span className="text-[10px] text-cat-fg-dim">
                Curated tech roles on CareersAt.Tech
              </span>
            </span>
            <ArrowRight
              size={13}
              aria-hidden="true"
              className="ml-auto text-cat-fg-hint group-hover:text-cat-primary transition-colors"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;
