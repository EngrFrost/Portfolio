/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#08080B",
        surface: "#111117",
        "surface-2": "#1A1A22",
        text: "#F5F4F2",
        "text-muted": "#8A8A96",
        accent: "#7C5CFF",
        "accent-bright": "#9E86FF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: { content: "1240px" },
    },
  },
  plugins: [],
};
