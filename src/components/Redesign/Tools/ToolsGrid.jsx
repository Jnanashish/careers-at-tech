import React from "react";
import { ArrowRight } from "lucide-react";
import ToolCard from "./ToolCard";
import { CATEGORIES } from "./toolsData";

const ToolsGrid = ({ tools, showSections, onCategoryChange }) => {
  if (showSections) {
    // Group tools by category
    const grouped = {};
    for (const tool of tools) {
      if (!grouped[tool.category]) grouped[tool.category] = [];
      grouped[tool.category].push(tool);
    }

    let globalIndex = 0;

    return (
      <div className="max-w-content mx-auto px-4 lg:px-6 py-8 space-y-12">
        {CATEGORIES.map((cat) => {
          const catTools = grouped[cat.id];
          if (!catTools || catTools.length === 0) return null;

          return (
            <section key={cat.id}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-text-primary">
                  {cat.emoji} {cat.label}
                </h2>
                <button
                  onClick={() => onCategoryChange(cat.id)}
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  View all ({catTools.length})
                  <ArrowRight size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catTools.map((tool) => {
                  const idx = globalIndex++;
                  return <ToolCard key={tool.id} tool={tool} index={idx} />;
                })}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  // Flat grid — filtered by category or search
  return (
    <div className="max-w-content mx-auto px-4 lg:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </div>
  );
};

export default ToolsGrid;
