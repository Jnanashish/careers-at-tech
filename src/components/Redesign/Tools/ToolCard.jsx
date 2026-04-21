import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, CheckCircle } from "lucide-react";
import { CATEGORIES } from "./toolsData";

const shouldAnimate =
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

const pricingStyles = {
  free: "bg-[#ECFDF5] text-[#059669]",
  freemium: "bg-[#FEF3C7] text-[#D97706]",
  paid: "bg-[#FEE2E2] text-[#DC2626]",
};

const pricingLabels = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

const ToolCard = ({ tool, index = 0 }) => {
  const category = CATEGORIES.find((c) => c.id === tool.category);

  const fadeUp = shouldAnimate
    ? {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2, delay: Math.min(index * 0.04, 0.5) },
      }
    : {};

  return (
    <motion.a
      {...fadeUp}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${tool.name} — ${category?.label || tool.category} — ${pricingLabels[tool.pricing]} (opens in new tab)`}
      className="block bg-white rounded-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 border border-transparent hover:border-border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {/* Header: Icon + Name + NEW badge */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg border border-border bg-white flex items-center justify-center flex-shrink-0 text-lg">
          {category?.emoji || "🔧"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-text-primary truncate">
              {tool.name}
            </h3>
            {tool.isNew && (
              <span className="flex-shrink-0 text-[10px] font-bold uppercase bg-[#DBEAFE] text-[#1D4ED8] rounded-full px-2 py-0.5">
                NEW
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mt-1 line-clamp-2">
            {tool.shortDescription}
          </p>
        </div>
      </div>

      {/* Pills: Category + Pricing + Platforms */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        <span className="bg-[#F3F4F6] text-[#374151] text-xs font-medium px-2.5 py-1 rounded-full">
          {category?.label || tool.category}
        </span>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${pricingStyles[tool.pricing]}`}
        >
          {pricingLabels[tool.pricing]}
        </span>
        {tool.platforms.map((platform) => (
          <span
            key={platform}
            className="bg-[#F3F4F6] text-[#6B7280] text-xs px-2 py-0.5 rounded-full"
          >
            {platform}
          </span>
        ))}
      </div>

      {/* Rating + Verified */}
      <div className="flex items-center gap-3 mt-3 text-xs text-text-tertiary">
        {tool.rating && (
          <span className="flex items-center gap-1">
            <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
            <span className="font-medium text-text-primary">{tool.rating}</span>
            {tool.ratingSource && <span>({tool.ratingSource})</span>}
          </span>
        )}
        {tool.rating && tool.lastVerified && (
          <span className="text-text-tertiary">·</span>
        )}
        {tool.lastVerified && (
          <span className="flex items-center gap-1">
            <CheckCircle size={12} className="text-secondary" />
            Verified {tool.lastVerified}
          </span>
        )}
      </div>

      {/* Divider + CTA */}
      <div className="border-t border-[#F3F4F6] mt-3 pt-3 flex justify-end">
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors">
          Visit Tool
          <ExternalLink size={14} />
        </span>
      </div>
    </motion.a>
  );
};

export default ToolCard;
