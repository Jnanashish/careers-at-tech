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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-caption uppercase tracking-widest text-text-tertiary font-medium">
          Quick Templates
        </span>
        {hasActiveFilters && !showSaveInput && (
          <button
            type="button"
            onClick={() => setShowSaveInput(true)}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover cursor-pointer transition-colors duration-150"
          >
            <Plus size={14} /> Save current
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
            placeholder="Template name..."
            className="flex-1 h-11 px-4 py-3 text-base rounded-button border border-border bg-white text-text-primary focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15 placeholder:text-text-tertiary transition-all duration-200"
            autoFocus
          />
          <button
            type="button"
            onClick={handleSave}
            className="p-2.5 rounded-button text-primary hover:bg-primary-light cursor-pointer transition-colors duration-150 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
            className="p-2.5 rounded-button text-text-tertiary hover:text-text-primary cursor-pointer transition-colors duration-150 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cancel"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {templates.map((template) => (
          <motion.button
            key={template.id}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onApply(template)}
            className="relative group flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-white border border-border text-text-secondary hover:border-primary hover:text-primary shadow-sm hover:shadow-card transition-all duration-200 cursor-pointer min-h-[44px]"
          >
            <Bookmark size={14} />
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
                className="hidden group-hover:inline-flex ml-1 text-text-tertiary hover:text-red-500"
                aria-label={`Delete ${template.name}`}
              >
                <X size={14} />
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TemplateBar;
