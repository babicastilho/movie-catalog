module.exports = {
  darkMode: "class", // Habilita o modo escuro baseado na classe "dark"
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: "100ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-in",
      },
      letterSpacing: {
        tight: "-0.015em",
      },
    },
  },
  plugins: [],
};
