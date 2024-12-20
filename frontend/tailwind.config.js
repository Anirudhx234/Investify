/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";
import daisyui from "daisyui";

export default {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extract,
  },
  safelist: [],
  theme: {
    extend: {
      fontFamily: {
        header: ["Montserrat", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      zIndex: {
        1: 1,
      },
    },
    screens,
    fontSize,
    /** @type {import('fluid-tailwind').FluidThemeConfig} */
    fluid: ({ theme }) => ({
      defaultScreens: ["20rem", theme("screens.2xl")],
    }),
  },
  plugins: [fluid, daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};
