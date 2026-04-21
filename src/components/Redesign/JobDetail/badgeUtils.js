export const badgeStyles = {
  internship: "bg-badge-internship-bg text-badge-internship-text",
  intern: "bg-badge-internship-bg text-badge-internship-text",
  full: "bg-badge-fulltime-bg text-badge-fulltime-text",
  "full time": "bg-badge-fulltime-bg text-badge-fulltime-text",
  "full-time": "bg-badge-fulltime-bg text-badge-fulltime-text",
  remote: "bg-badge-remote-bg text-badge-remote-text",
  hybrid: "bg-badge-hybrid-bg text-badge-hybrid-text",
  onsite: "bg-badge-onsite-bg text-badge-onsite-text",
  "on-site": "bg-badge-onsite-bg text-badge-onsite-text",
};

export const getBadgeClass = (type) => {
  if (!type) return "bg-gray-100 text-gray-600";
  const key = type.toLowerCase().trim();
  return badgeStyles[key] || "bg-gray-100 text-gray-600";
};

export const formatJobType = (type) => {
  if (!type || type === "N") return null;
  if (type === "full") return "Full Time";
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export const isValid = (val) => val && val !== "N" && val !== "<p>N</p>";

export const isSalaryValid = (val) => isValid(val) && !val.includes("0LPA");
