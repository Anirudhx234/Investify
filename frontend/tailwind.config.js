/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

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
      zIndex: {
        999: "999",
      },
    },
    colors: {
      "primary-background": "var(--primary-background)",
      "secondary-background": "var(--secondary-background)",
      "primary-text": "var(--primary-text)",
      "secondary-text": "var(--secondary-text)",
      "primary-accent": "var(--primary-accent)",
      "secondary-accent": "var(--secondary-accent)",
      "warning-accent": "var(--warning-accent)",
      "error-accent": "var(--error-accent)",
    },
    screens,
    fontSize,
    /** @type {import('fluid-tailwind').FluidThemeConfig} */
    fluid: ({ theme }) => ({
      defaultScreens: ["20rem", theme("screens.2xl")],
    }),
  },
  plugins: [fluid],
};
