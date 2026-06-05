import React from "react";
import { Zap, Bookmark, Plus, X } from "lucide-react";

const PILL =
  "inline-flex items-center gap-2 min-h-[40px] px-[15px] rounded-full text-[13px] font-medium border transition-colors cursor-pointer focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cat-primary/20";

const TemplateBar = ({ templates, presets, onApply, onApplyPreset, onSavePreset, onRemovePreset }) => (
  <div>
    <p className="text-[10px] font-semibold tracking-[1px] uppercase text-cat-fg-hint mb-3">
      Quick-start templates
    </p>
    <div className="flex flex-wrap gap-[10px]">
      {templates.map((tpl) => (
        <button
          key={tpl.name}
          type="button"
          onClick={() => onApply(tpl)}
          className={`${PILL} group bg-white text-cat-fg border-cat-border hover:border-cat-primary-light hover:bg-cat-blue-bg hover:text-cat-primary`}
        >
          <Zap size={11} aria-hidden="true" className="text-cat-fg-dim group-hover:text-cat-primary transition-colors" />
          {tpl.name}
        </button>
      ))}

      {presets.map((p, i) => (
        <span
          key={`preset-${i}`}
          role="button"
          tabIndex={0}
          onClick={() => onApplyPreset(p)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onApplyPreset(p);
          }}
          className={`${PILL} group bg-white text-cat-fg border-cat-border pr-2 hover:border-cat-primary-light hover:bg-cat-blue-bg hover:text-cat-primary`}
        >
          <Bookmark size={11} aria-hidden="true" className="text-cat-fg-dim group-hover:text-cat-primary transition-colors" />
          {p.name}
          <span
            role="button"
            tabIndex={0}
            aria-label={`Delete preset ${p.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onRemovePreset(i);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                onRemovePreset(i);
              }
            }}
            className="inline-flex items-center justify-center w-[22px] h-[22px] ml-0.5 rounded-full text-cat-fg-hint hover:bg-cat-blue-bg hover:text-cat-danger"
          >
            <X size={12} aria-hidden="true" />
          </span>
        </span>
      ))}

      <button
        type="button"
        onClick={onSavePreset}
        className={`${PILL} bg-white text-cat-primary border-cat-border border-dashed hover:border-cat-primary-light hover:bg-cat-blue-bg`}
      >
        <Plus size={11} aria-hidden="true" />
        Save current
      </button>
    </div>
  </div>
);

export default TemplateBar;
