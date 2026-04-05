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
      // fallback
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

  // Color-code URL params
  const renderColoredURL = (rawUrl) => {
    try {
      const urlObj = new URL(rawUrl);
      const base = urlObj.origin + urlObj.pathname;
      const params = urlObj.searchParams;
      if (!params.toString()) return <span className="text-linkedin-charcoal break-all">{rawUrl}</span>;

      return (
        <span className="break-all">
          <span className="text-linkedin-muted">{base}?</span>
          {Array.from(params.entries()).map(([key, value], i) => (
            <span key={key}>
              {i > 0 && <span className="text-linkedin-muted">&amp;</span>}
              <span className="text-linkedin-accent font-semibold">{key}</span>
              <span className="text-linkedin-muted">=</span>
              <span className="text-linkedin-charcoal">{decodeURIComponent(value)}</span>
            </span>
          ))}
        </span>
      );
    } catch {
      return <span className="text-linkedin-charcoal break-all">{rawUrl}</span>;
    }
  };

  if (isEmpty) {
    return (
      <div className="bg-white rounded-lg shadow-linkedin-card p-6 text-center">
        <Search size={32} className="mx-auto text-linkedin-muted mb-3" />
        <p className="font-dm text-sm text-linkedin-muted">
          Start by typing a job title or pick a template above
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop URL preview */}
      <div className="hidden md:block bg-white rounded-lg shadow-linkedin-card overflow-hidden">
        <div className="px-4 py-3 border-b border-linkedin-border">
          <span className="text-xs font-dm font-medium text-linkedin-muted uppercase tracking-wider">
            Generated URL
          </span>
        </div>
        <div className="p-4">
          <motion.div
            key={url}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs leading-relaxed p-3 bg-linkedin-bg rounded-lg border border-linkedin-border"
          >
            {renderColoredURL(url)}
          </motion.div>
          <div className="flex items-center gap-2 mt-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button text-sm font-dm font-medium bg-linkedin-accent text-white hover:bg-linkedin-accent-hover transition-colors cursor-pointer"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button text-sm font-dm font-medium border border-linkedin-border text-linkedin-charcoal hover:border-linkedin-accent hover:text-linkedin-accent transition-colors cursor-pointer"
            >
              <ExternalLink size={14} /> Open in LinkedIn
            </button>
            {onShare && (
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button text-sm font-dm font-medium border border-linkedin-border text-linkedin-charcoal hover:border-linkedin-accent hover:text-linkedin-accent transition-colors cursor-pointer"
              >
                <Share2 size={14} />
                {copiedShare ? "Link copied!" : "Share this search"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-linkedin-border p-3 z-40 shadow-lg">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-button text-sm font-dm font-medium bg-linkedin-accent text-white cursor-pointer"
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
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-button text-sm font-dm font-medium border border-linkedin-border text-linkedin-charcoal cursor-pointer"
          >
            <ExternalLink size={14} /> Open
          </button>
        </div>
      </div>
    </>
  );
};

export default URLPreview;
