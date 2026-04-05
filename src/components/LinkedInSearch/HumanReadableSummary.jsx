import { buildHumanReadableSummary } from "./lib/url-builder";

const HumanReadableSummary = ({ filters, tab }) => {
  const summary = buildHumanReadableSummary(filters, tab);

  if (!summary) return null;

  // Convert **text** to <strong> elements
  const parts = summary.split(/(\*\*[^*]+\*\*)/g);
  const rendered = parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-linkedin-charcoal font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });

  return (
    <div className="px-4 py-3 bg-linkedin-accent-light rounded-lg border border-linkedin-accent/10">
      <p className="font-dm text-sm text-linkedin-muted leading-relaxed">
        {rendered}
      </p>
    </div>
  );
};

export default HumanReadableSummary;
