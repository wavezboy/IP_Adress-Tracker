/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "Rubik",
      },

      backgroundImage: {
        hero: "url('/src/assets/images/pattern-bg-desktop.png')",
        heroMobile: "url('/src/assets/images/bg-pattern-bg-mobile.png')",
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
  variants: {
    extend: {
      borderstyle: ["responsive", "hover"],
      borderwidth: ["responsive", "hover"],
    },
  },
};
