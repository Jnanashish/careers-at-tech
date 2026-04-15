import { buildHumanReadableSummary } from "./lib/url-builder";

const HumanReadableSummary = ({ filters, tab }) => {
  const summary = buildHumanReadableSummary(filters, tab);

  if (!summary) return null;

  // Convert **text** to <strong> elements
  const parts = summary.split(/(\*\*[^*]+\*\*)/g);
  const rendered = parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-text-primary font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });

  return (
    <div className="p-4 bg-card rounded-card shadow-card border border-border">
      <p className="font-dm text-sm text-text-secondary leading-relaxed">
        {rendered}
      </p>
    </div>
  );
};

export default HumanReadableSummary;
