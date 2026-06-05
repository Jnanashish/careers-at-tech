import React from "react";
import { X } from "lucide-react";

const ActiveFiltersBar = ({ chips, onApply, onClearAll }) => {
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3.5 bg-cat-surface-soft border border-cat-border rounded-[10px]">
      <span className="text-[13px] text-cat-fg-dim mr-0.5">Active:</span>
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => onApply(c)}
          className="inline-flex items-center gap-[7px] pl-[11px] pr-2 py-1.5 rounded-[4px] bg-cat-blue-bg text-cat-primary border border-transparent text-[13px] font-medium transition-colors hover:border-cat-primary-light cursor-pointer focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cat-primary/20"
        >
          {c.label}
          <X size={10} aria-hidden="true" className="opacity-70" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="ml-auto px-1 py-1.5 text-[13px] font-medium text-cat-fg-dim hover:text-cat-danger cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFiltersBar;
