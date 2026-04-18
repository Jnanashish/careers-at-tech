import { buildHumanReadableSummary } from "./lib/url-builder";

const HumanReadableSummary = ({ filters, tab }) => {
  const summary = buildHumanReadableSummary(filters, tab);

  if (!summary) return null;

  const parts = summary.split(/(\*\*[^*]+\*\*)/g);
  const rendered = parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <em
          key={i}
          className="not-italic font-serif-display italic text-linkedin-bg font-normal border-b border-linkedin-accent/70 px-0.5"
        >
          {part.slice(2, -2)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });

  return (
    <div className="relative px-4 py-3.5 rounded-[10px] bg-linkedin-proof-surface border border-linkedin-proof-rule">
      <span
        aria-hidden="true"
        className="absolute -top-2 left-4 px-1.5 font-mono-proof text-[9.5px] uppercase tracking-[0.22em] text-linkedin-highlight bg-linkedin-proof-bg"
      >
        Reading proof
      </span>
      <p className="font-sans-linkedin text-[13.5px] text-linkedin-rule/90 leading-[1.6]">
        {rendered}
      </p>
    </div>
  );
};

export default HumanReadableSummary;
