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

const pricingLabels = { free: "Free", freemium: "Freemium", paid: "Paid" };

const FeaturedTools = ({ tools }) => {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="max-w-content mx-auto px-4 lg:px-6 pt-10 pb-2">
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        ⭐ Editor&apos;s Picks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool, i) => {
          const category = CATEGORIES.find((c) => c.id === tool.category);
          const fadeUp = shouldAnimate
            ? {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.2, delay: i * 0.1 },
              }
            : {};

          return (
            <motion.a
              key={tool.id}
              {...fadeUp}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${tool.name} — Editor's Pick (opens in new tab)`}
              className="block bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 border border-transparent hover:border-border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {/* Editor's Pick ribbon */}
              <div className="bg-[#FEF3C7] text-[#92400E] text-xs font-semibold px-4 py-1.5">
                ★ EDITOR&apos;S PICK
              </div>

              <div className="p-6">
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg border border-border bg-white flex items-center justify-center flex-shrink-0 text-xl">
                    {category?.emoji || "🔧"}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {tool.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                  {tool.shortDescription}
                </p>

                {/* Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${pricingStyles[tool.pricing]}`}
                  >
                    {pricingLabels[tool.pricing]}
                  </span>
                  {tool.platforms.map((p) => (
                    <span
                      key={p}
                      className="bg-[#F3F4F6] text-[#6B7280] text-xs px-2 py-0.5 rounded-full"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                {tool.rating && (
                  <div className="flex items-center gap-1 text-xs text-text-tertiary mb-4">
                    <Star
                      size={12}
                      className="text-[#F59E0B] fill-[#F59E0B]"
                    />
                    <span className="font-medium text-text-primary">
                      {tool.rating}
                    </span>
                    {tool.ratingSource && <span>({tool.ratingSource})</span>}
                  </div>
                )}

                {/* CTA */}
                <div className="border-t border-[#F3F4F6] pt-3 flex justify-end">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Visit Tool
                    <ExternalLink size={14} />
                  </span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedTools;
