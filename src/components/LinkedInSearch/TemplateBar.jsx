import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, X, Plus, Check } from "lucide-react";

const TemplateBar = ({ templates, onApply, onSave, onRemove, hasActiveFilters }) => {
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const handleSave = () => {
    if (templateName.trim()) {
      onSave(templateName.trim());
      setTemplateName("");
      setShowSaveInput(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setShowSaveInput(false);
      setTemplateName("");
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-mono-proof text-[10px] uppercase tracking-[0.22em] text-linkedin-accent">
            ¶
          </span>
          <span className="font-mono-proof text-[10.5px] uppercase tracking-[0.22em] text-linkedin-ink-soft">
            Standing type · quick plates
          </span>
        </div>
        {hasActiveFilters && !showSaveInput && (
          <button
            type="button"
            onClick={() => setShowSaveInput(true)}
            className="inline-flex items-center gap-1 font-mono-proof text-[10.5px] font-semibold uppercase tracking-[0.18em] text-linkedin-accent hover:text-linkedin-accent-hover cursor-pointer"
          >
            <Plus size={11} /> Save plate
          </button>
        )}
      </div>

      {showSaveInput && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Name this plate…"
            className="flex-1 px-3 py-1.5 text-[13.5px] font-sans-linkedin text-linkedin-ink rounded-full border border-linkedin-rule bg-linkedin-surface focus:border-linkedin-accent focus:outline-none focus:ring-2 focus:ring-linkedin-accent/20"
            autoFocus
          />
          <button
            type="button"
            onClick={handleSave}
            className="p-1.5 rounded-full text-linkedin-accent hover:bg-linkedin-accent-light cursor-pointer"
            aria-label="Save template"
          >
            <Check size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              setShowSaveInput(false);
              setTemplateName("");
            }}
            className="p-1.5 rounded-full text-linkedin-muted hover:text-linkedin-ink cursor-pointer"
            aria-label="Cancel"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {templates.map((template) => (
          <motion.button
            key={template.id}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onApply(template)}
            className="relative group flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans-linkedin text-[12.5px] font-medium bg-linkedin-surface border border-linkedin-rule text-linkedin-ink-soft hover:border-linkedin-accent hover:text-linkedin-accent hover:-translate-y-[1px] transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-linkedin-accent focus-visible:ring-offset-2 focus-visible:ring-offset-linkedin-bg"
          >
            <Bookmark
              size={11}
              className="text-linkedin-muted group-hover:text-linkedin-accent transition-colors"
            />
            {template.name}
            {!template.isBuiltIn && onRemove && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(template.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    onRemove(template.id);
                  }
                }}
                className="hidden group-hover:inline-flex ml-0.5 text-linkedin-muted hover:text-linkedin-accent"
                aria-label={`Delete ${template.name}`}
              >
                <X size={11} />
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TemplateBar;
