/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/images/uni-bg.jpg')",
        "campus-pattern":
          "linear-gradient(to bottom,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url('/src/assets/images/campus.jpg')",
        "footer-pattern":
          "linear-gradient(to left bottom, #4337c9, #3d4cd6, #395ee2, #3770ed, #3b81f6);",
        gradient:
          " linear-gradient(to bottom, #6366f1, #928af6, #b9b0fa, #ddd7fd, #ffffff);",
      },
      backgroundColor: {
        light: "#f5f6f",
      },
      boxShadow: {
        light: "0px 1px 6px rgba(0, 0, 0, 0.1)",
      },

      color: {
        black: "#111723",
      },
      height: {
        100: "800px",
        90: "500px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
