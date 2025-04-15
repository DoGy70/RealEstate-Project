/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#0061FF",
          200: "#0061FF1A",
          300: "#0061FF0D",
        },
        black: {
          100: "#191D31",
          200: "#666876",
          300: "#8C8E98",
        },
      },
      fontFamily: {
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-semibold": ["Rubik-Semibold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
