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
      if (!params.toString()) return <span className="text-text-primary break-all">{rawUrl}</span>;

      return (
        <span className="break-all">
          <span className="text-text-tertiary">{base}?</span>
          {Array.from(params.entries()).map(([key, value], i) => (
            <span key={key}>
              {i > 0 && <span className="text-text-tertiary">&amp;</span>}
              <span className="text-primary font-semibold">{key}</span>
              <span className="text-text-tertiary">=</span>
              <span className="text-text-primary">{decodeURIComponent(value)}</span>
            </span>
          ))}
        </span>
      );
    } catch {
      return <span className="text-text-primary break-all">{rawUrl}</span>;
    }
  };

  if (isEmpty) {
    return (
      <div className="bg-white rounded-lg shadow-card p-8 text-center">
        <Search size={48} className="mx-auto text-text-tertiary mb-4" />
        <p className="text-sm text-text-secondary">
          Start by typing a job title or pick a template above
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop URL preview */}
      <div className="hidden md:block bg-white rounded-lg shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <span className="text-caption uppercase tracking-widest text-text-tertiary font-medium">
            Generated URL
          </span>
        </div>
        <div className="p-6">
          <motion.div
            key={url}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs leading-relaxed p-4 bg-page rounded-lg border border-border"
          >
            {renderColoredURL(url)}
          </motion.div>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {/* Design system 7.1: Primary button — bg #2563EB, text white, 12px 20px padding, 14px/500 */}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-button text-sm font-medium bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer min-h-[44px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check size={16} /> Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Copy size={16} /> Copy URL
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            {/* Design system 7.1: Ghost button — transparent bg, text #2563EB, border #2563EB */}
            <button
              type="button"
              onClick={handleOpen}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-button text-sm font-medium border border-primary text-primary hover:bg-primary-light transition-all duration-200 cursor-pointer min-h-[44px]"
            >
              <ExternalLink size={16} /> Open in LinkedIn
            </button>
            {onShare && (
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-button text-sm font-medium border border-border text-text-secondary hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer min-h-[44px]"
              >
                <Share2 size={16} />
                {copiedShare ? "Link copied!" : "Share"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar — Design system 10.6: height 72px, shadow-top, z-40 */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-border p-4 z-40" style={{ boxShadow: '0 -4px 12px rgba(0,0,0,0.08)' }}>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-button text-sm font-medium bg-primary text-white min-h-[44px] cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={16} /> Copied!
              </>
            ) : (
              <>
                <Copy size={16} /> Copy URL
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleOpen}
            className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-button text-sm font-medium border border-primary text-primary min-h-[44px] cursor-pointer"
          >
            <ExternalLink size={16} /> Open
          </button>
        </div>
      </div>
    </>
  );
};

export default URLPreview;
