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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-dm font-medium text-linkedin-muted uppercase tracking-wider">
          Quick Templates
        </span>
        {hasActiveFilters && !showSaveInput && (
          <button
            type="button"
            onClick={() => setShowSaveInput(true)}
            className="inline-flex items-center gap-1 text-xs font-dm text-linkedin-accent hover:text-linkedin-accent-hover cursor-pointer"
          >
            <Plus size={12} /> Save current
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
            className="flex-1 px-3 py-1.5 text-sm font-dm rounded-button border border-linkedin-border focus:border-linkedin-accent focus:outline-none"
            autoFocus
          />
          <button
            type="button"
            onClick={handleSave}
            className="p-1.5 rounded-button text-linkedin-accent hover:bg-linkedin-accent-light cursor-pointer"
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
            className="p-1.5 rounded-button text-linkedin-muted hover:text-linkedin-charcoal cursor-pointer"
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
            whileTap={{ scale: 0.95 }}
            onClick={() => onApply(template)}
            className="relative group flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-dm font-medium bg-white border border-linkedin-border text-linkedin-charcoal hover:border-linkedin-accent hover:text-linkedin-accent transition-colors cursor-pointer"
          >
            <Bookmark size={12} />
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
                className="hidden group-hover:inline-flex ml-1 text-linkedin-muted hover:text-red-500"
                aria-label={`Delete ${template.name}`}
              >
                <X size={12} />
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TemplateBar;
