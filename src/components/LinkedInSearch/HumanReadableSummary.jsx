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

  // Design system 9.2 CTA card variant: bg primary-light with subtle border
  return (
    <div className="px-6 py-4 bg-primary-light rounded-lg border border-primary/10">
      <p className="text-sm text-text-secondary leading-relaxed">
        {rendered}
      </p>
    </div>
  );
};

export default HumanReadableSummary;
