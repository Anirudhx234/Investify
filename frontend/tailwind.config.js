/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";
import daisyui from "daisyui";

export default {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extract,
  },
  theme: {
    extend: {
      fontFamily: {
        header: ["Montserrat", "sans-serif"],
        body: ["Roboto", "sans-serif"],
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
    themes: ["corporate", "dark"],
  },
};
