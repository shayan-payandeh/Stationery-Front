import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["[&>*]:text-[.9rem]"],
  theme: {
    screens: {
      //defaults
      sm: "520px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",

      //custom by shayan
      mobileSM: "430px",
      mobileLG: "590px",
      tablet: "1024px",
      desktopSM: "1280px",
      desktopLg: "1450px",
    },
    extend: {
      transitionProperty: {
        height: "height",
      },
      colors: {
        primary: {
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
        },
        light: {
          100: "var(--color-light-100)",
          200: "var(--color-light-200)",
          300: "var(--color-light-300)",
          350: "var(--color-light-350)",
          400: "var(--color-light-400)",
          500: "var(--color-light-500)",
        },
        dark: {
          500: "var(--color-dark-500)",
          700: "var(--color-dark-700)",
        },
        warning: {
          200: "var(--color-warning-200)",
          500: "var(--color-warning-500)",
          800: "var(--color-warning-800)",
        },
      },

      fontFamily: {
        sans: ["var(--font-vazir)"],
        mikhak: ["var(--font-mikhak)"],
        morvarid: ["var(--font-morvarid)"],
      },
      fontSize: {
        listItem: "clamp(0.71875rem, 0.6477rem + 0.3551vw, 0.875rem)",
        title: "clamp(1.09375rem, 1.0042rem + 0.4478vw, 1.46875rem)",
      },

      boxShadow: {
        container: "rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
      },
    },
  },
  plugins: [
    require("daisyui"),
    // plugin(({ addUtilities }) => {
    //   addUtilities({
    //     ".phong": {
    //       width: "300px",
    //       height: "300px",
    //     },
    //   });
    // }),
  ],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: "", // The element that receives theme color CSS variables
  },
};
export default config;
