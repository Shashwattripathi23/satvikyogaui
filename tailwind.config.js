/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        matcha: {
          DEFAULT: "#809671",
          light: "#98AE89",
          dark: "#6B7F5F",
        },
        almond: {
          DEFAULT: "#E5E0D8",
          light: "#F0EDE8",
          dark: "#D4CFC5",
        },
        pistache: {
          DEFAULT: "#83B792",
          light: "#9CC7A8",
          dark: "#6E9D7C",
        },
        chai: {
          DEFAULT: "#D2AB80",
          light: "#E0C19A",
          dark: "#C0956B",
        },
        carob: {
          DEFAULT: "#725C3A",
          light: "#8A714D",
          dark: "#5A4A2E",
        },
        vanilla: {
          DEFAULT: "#E5D2B8",
          light: "#F0E3CF",
          dark: "#D4C0A3",
        },
      },
    },
  },
  plugins: [],
};
