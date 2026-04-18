import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ExternalLink, Share2, Search } from "lucide-react";

const URLPreview = ({ url, isEmpty, onShare }) => {
  const [copied, setCopied] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const handleOpen = useCallback(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, [url]);

  const handleShare = useCallback(async () => {
    if (onShare) {
      const shareUrl = onShare();
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      } catch {}
    }
  }, [onShare]);

  const renderColoredURL = (rawUrl) => {
    try {
      const urlObj = new URL(rawUrl);
      const base = urlObj.origin + urlObj.pathname;
      const params = Array.from(urlObj.searchParams.entries());

      const lineNum = (n) => (
        <span className="select-none text-linkedin-muted/60 w-6 text-right mr-3 flex-shrink-0 font-mono-proof">
          {String(n).padStart(2, "0")}
        </span>
      );

      if (!params.length) {
        return (
          <div className="flex">
            {lineNum(1)}
            <span className="text-linkedin-rule/60">{rawUrl}</span>
          </div>
        );
      }

      const lines = [];
      lines.push(
        <div key="base" className="flex">
          {lineNum(1)}
          <span className="text-linkedin-rule">
            {base}
            <span className="text-linkedin-highlight">?</span>
          </span>
        </div>
      );

      params.forEach(([key, value], i) => {
        lines.push(
          <div key={`${key}-${value}`} className="flex items-baseline">
            {lineNum(i + 2)}
            <span className="break-all">
              {i > 0 && (
                <span className="text-linkedin-muted mr-0.5">&amp;</span>
              )}
              <span
                className="text-linkedin-accent font-semibold px-0.5 rounded-[2px] animate-ink-in"
                style={{ animationDuration: "520ms" }}
              >
                {key}
              </span>
              <span className="text-linkedin-muted">=</span>
              <span className="text-linkedin-highlight/95">
                {decodeURIComponent(value)}
              </span>
            </span>
          </div>
        );
      });

      return <div className="space-y-0.5">{lines}</div>;
    } catch {
      return <span className="text-linkedin-rule/60 break-all">{rawUrl}</span>;
    }
  };

  if (isEmpty) {
    return (
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute -top-2 left-4 px-1.5 font-mono-proof text-[9.5px] uppercase tracking-[0.22em] text-linkedin-highlight bg-linkedin-proof-bg z-10"
        >
          Proof — blank
        </span>
        <div className="flex flex-col items-center justify-center py-14 rounded-[10px] bg-linkedin-proof-surface border border-dashed border-linkedin-proof-rule">
          <div className="w-11 h-11 rounded-[8px] bg-linkedin-proof-bg border border-linkedin-proof-rule flex items-center justify-center mb-4">
            <Search size={18} className="text-linkedin-muted" />
          </div>
          <p className="font-serif-display italic text-[15px] text-linkedin-rule/80 text-center max-w-[240px] leading-snug">
            Set a keyword or pick a template
            <br />
            to pull your first proof.
          </p>
        </div>
      </div>
    );
  }

  const paramCount = Array.from(new URL(url).searchParams).length;

  return (
    <>
      {/* Desktop proof */}
      <div className="hidden md:block">
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute -top-2 left-4 px-1.5 font-mono-proof text-[9.5px] uppercase tracking-[0.22em] text-linkedin-highlight bg-linkedin-proof-bg z-10"
          >
            Proof &middot; {paramCount}
            {paramCount === 1 ? " mark" : " marks"}
          </span>

          <motion.div
            key={url}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.28 }}
            className="font-mono-proof text-[12.5px] leading-[1.75] p-4 pt-5 rounded-[10px] bg-linkedin-proof-surface border border-linkedin-proof-rule overflow-x-auto no-scrollbar"
          >
            {renderColoredURL(url)}
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] font-sans-linkedin text-[13.5px] font-semibold bg-linkedin-accent text-linkedin-surface hover:bg-linkedin-accent-hover transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-linkedin-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-linkedin-proof-bg"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Check size={14} /> Stamped!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Copy size={14} /> Pull a proof
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] font-sans-linkedin text-[13.5px] font-medium border border-linkedin-proof-rule text-linkedin-bg/85 hover:border-linkedin-highlight hover:text-linkedin-highlight transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-linkedin-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-linkedin-proof-bg"
          >
            <ExternalLink size={14} /> Open on LinkedIn
          </button>
          {onShare && (
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] font-sans-linkedin text-[13.5px] font-medium border border-linkedin-proof-rule text-linkedin-bg/85 hover:border-linkedin-highlight hover:text-linkedin-highlight transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-linkedin-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-linkedin-proof-bg"
            >
              <Share2 size={14} />
              {copiedShare ? "Link stamped" : "Share"}
            </button>
          )}
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-linkedin-proof-bg border-t border-linkedin-proof-rule p-3 z-40">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-[8px] font-sans-linkedin text-[13.5px] font-semibold bg-linkedin-accent text-linkedin-surface cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} /> Stamped!
              </>
            ) : (
              <>
                <Copy size={14} /> Pull proof
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleOpen}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-[8px] font-sans-linkedin text-[13.5px] font-medium border border-linkedin-proof-rule text-linkedin-bg/85 cursor-pointer"
          >
            <ExternalLink size={14} /> Open
          </button>
        </div>
      </div>
    </>
  );
};

export default URLPreview;
