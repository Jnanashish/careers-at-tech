import { buildHumanReadableSummary } from "./lib/url-builder";

const HumanReadableSummary = ({ filters, tab }) => {
  const summary = buildHumanReadableSummary(filters, tab);

  if (!summary) return null;

  const parts = summary.split(/(\*\*[^*]+\*\*)/g);
  const rendered = parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });

  return (
    <div className="px-4 py-3 rounded-lg bg-white/[0.06] border border-white/10">
      <p className="font-dm text-sm text-gray-300 leading-relaxed italic">
        {rendered}
      </p>
    </div>
  );
};

export default HumanReadableSummary;
