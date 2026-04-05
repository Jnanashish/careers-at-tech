/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/widgets/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          light: "#EFF6FF",
        },
        secondary: "#0D9488",
        page: "#F9FAFB",
        card: "#FFFFFF",
        "text-primary": "#111827",
        "text-secondary": "#4B5563",
        "text-tertiary": "#9CA3AF",
        border: "#E5E7EB",
        "footer-bg": "#111827",
        "footer-text": "#D1D5DB",
        badge: {
          "remote-bg": "#ECFDF5",
          "remote-text": "#059669",
          "hybrid-bg": "#FEF3C7",
          "hybrid-text": "#D97706",
          "onsite-bg": "#EFF6FF",
          "onsite-text": "#2563EB",
          "internship-bg": "#F3E8FF",
          "internship-text": "#7C3AED",
          "fulltime-bg": "#F0FDF4",
          "fulltime-text": "#15803D",
        },
        whatsapp: "#25D366",
        linkedin: {
          bg: "#F7F4EF",
          accent: "#C75B3F",
          "accent-hover": "#B5492F",
          "accent-light": "#FFF5F2",
          charcoal: "#2C2C2C",
          border: "#E5E0D8",
          surface: "#FFFFFF",
          muted: "#8A8580",
        },
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans", "system-ui", "-apple-system", "sans-serif"],
        "serif-display": ["var(--font-instrument-serif)", "Georgia", "serif"],
        dm: ["var(--font-dm-sans)", "Inter", "sans-serif"],
      },
      fontSize: {
        hero: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        "page-title": ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }],
        "section-header": ["1.875rem", { lineHeight: "1.3", fontWeight: "600" }],
        "card-title": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.5", fontWeight: "500", letterSpacing: "0.05em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      maxWidth: {
        content: "1200px",
        card: "800px",
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        input: "8px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        "card-hover": "0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)",
        nav: "0 1px 3px rgba(0,0,0,0.1)",
        "search-focus": "0 0 0 3px rgba(37,99,235,0.1)",
        "linkedin-card": "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "linkedin-card-hover": "0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.3s ease-out forwards",
        shimmer: "shimmer 1.5s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
