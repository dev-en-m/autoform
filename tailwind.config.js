module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js","./src/**/*.css"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#e37926",
        "primary-hover": "#c86518",
        "background-light": "#f4f4f5",
        "background-dark": "#121212",
        "surface-dark": "#1e1e1e",
        "border-dark": "#333333",
        "text-secondary": "#a1a1aa",
        success: "#10b981",
        "status-bg": "#18181b",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        mono: ["monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.375rem",
        xl: "0.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
