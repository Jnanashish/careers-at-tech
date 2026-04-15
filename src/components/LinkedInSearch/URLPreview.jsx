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
      if (!params.length) {
        return (
          <div className="flex">
            <span className="select-none text-gray-600 w-8 text-right mr-3 flex-shrink-0">1</span>
            <span className="text-gray-400">{rawUrl}</span>
          </div>
        );
      }

      const lines = [];
      lines.push(
        <div key="base" className="flex">
          <span className="select-none text-gray-600 w-8 text-right mr-3 flex-shrink-0">1</span>
          <span className="text-gray-500">{base}?</span>
        </div>
      );

      params.forEach(([key, value], i) => {
        lines.push(
          <div key={key} className="flex">
            <span className="select-none text-gray-600 w-8 text-right mr-3 flex-shrink-0">{i + 2}</span>
            <span>
              {i > 0 && <span className="text-gray-600">&amp;</span>}
              <span className="text-blue-400 font-semibold">{key}</span>
              <span className="text-gray-600">=</span>
              <span className="text-amber-300">{decodeURIComponent(value)}</span>
            </span>
          </div>
        );
      });

      return <div className="space-y-0.5">{lines}</div>;
    } catch {
      return <span className="text-gray-400 break-all">{rawUrl}</span>;
    }
  };

  if (isEmpty) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4">
            <Search size={20} className="text-gray-500" />
          </div>
          <p className="font-dm text-sm text-gray-500 text-center max-w-[200px]">
            Start by typing a job title or pick a template
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop URL preview */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-dm font-semibold text-gray-500 uppercase tracking-[0.08em]">
            Generated URL
          </span>
          <span className="text-[11px] font-dm text-gray-600">
            {Array.from(new URL(url).searchParams).length} params
          </span>
        </div>

        <motion.div
          key={url}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[13px] leading-relaxed p-4 bg-black/20 rounded-lg border border-white/10 overflow-x-auto no-scrollbar"
        >
          {renderColoredURL(url)}
        </motion.div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-dm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#1A1A2E]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Check size={14} /> Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Copy size={14} /> Copy URL
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-dm font-medium border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#1A1A2E]"
          >
            <ExternalLink size={14} /> Open in LinkedIn
          </button>
          {onShare && (
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-dm font-medium border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#1A1A2E]"
            >
              <Share2 size={14} />
              {copiedShare ? "Link copied!" : "Share"}
            </button>
          )}
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#1A1A2E] border-t border-white/10 p-3 z-40">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-dm font-medium bg-blue-500 text-white cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} /> Copied!
              </>
            ) : (
              <>
                <Copy size={14} /> Copy URL
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleOpen}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-dm font-medium border border-white/20 text-white/80 cursor-pointer"
          >
            <ExternalLink size={14} /> Open
          </button>
        </div>
      </div>
    </>
  );
};

export default URLPreview;
