/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16ABF8",
        danger: "#ED4C5C",
        lightgray: "#F4F4F4",
        generalblack: "#111111",
        generalsecondary: "#4A4A4A",
        generalgray: "#888888",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
