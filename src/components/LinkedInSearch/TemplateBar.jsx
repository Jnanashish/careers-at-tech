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
        <span className="text-[11px] font-dm font-semibold text-gray-400 uppercase tracking-[0.08em]">
          Quick Start
        </span>
        {hasActiveFilters && !showSaveInput && (
          <button
            type="button"
            onClick={() => setShowSaveInput(true)}
            className="inline-flex items-center gap-1 text-[11px] font-dm font-medium text-primary hover:text-primary-hover cursor-pointer uppercase tracking-wider"
          >
            <Plus size={11} /> Save current
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
            className="flex-1 px-3 py-1.5 text-sm font-dm rounded-full border border-gray-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 bg-white"
            autoFocus
          />
          <button
            type="button"
            onClick={handleSave}
            className="p-1.5 rounded-full text-primary hover:bg-primary/5 cursor-pointer"
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
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
            aria-label="Cancel"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {templates.map((template) => (
          <motion.button
            key={template.id}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onApply(template)}
            className="relative group flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-dm font-medium bg-gray-50 border border-gray-200 text-gray-600 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Bookmark size={11} className="text-gray-400 group-hover:text-primary transition-colors" />
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
                className="hidden group-hover:inline-flex ml-0.5 text-gray-400 hover:text-red-500"
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
