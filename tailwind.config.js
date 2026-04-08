/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx}"],
  important: ".blog-root",
  theme: {
    extend: {
      colors: {
        primary: "#0050ff",
        "primary-light": "#0061ff",
        "blue-bg": "#f4faff",
        "grey-text": "#2B2B2B",
        "grey-light-text": "#4B5556",
        "grey-border": "rgba(218, 223, 231, 1)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#4B5556",
            maxWidth: "none",
            h1: { color: "#121212", fontWeight: "700" },
            h2: { color: "#121212", fontWeight: "600" },
            h3: { color: "#121212", fontWeight: "600" },
            h4: { color: "#121212", fontWeight: "600" },
            a: {
              color: "#0050ff",
              textDecoration: "underline",
              "&:hover": { color: "#0061ff" },
            },
            strong: { color: "#2B2B2B" },
            code: {
              backgroundColor: "#f4faff",
              padding: "2px 6px",
              borderRadius: "4px",
              fontWeight: "400",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            "pre code": { backgroundColor: "transparent", padding: "0" },
            blockquote: {
              borderLeftColor: "#0050ff",
              color: "#2B2B2B",
              fontStyle: "normal",
            },
            img: { borderRadius: "8px" },
            hr: { borderColor: "rgba(218, 223, 231, 1)" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
