import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        "max-sm": {"max": "640px"}
      },
      colors: {
        "main-red": "#ef4444",
        "main-orange": "#ea580c",
        "whitesmoke": "#fafaf9",
        "main-grey": "#262626",
        "light-grey": "#7a7a7a",
        "sidebar-grey": "#353535"
      },
      keyframes: {
        navbarLogoSpinAnimation: {
          "0%": {
            transform: "rotateZ(0deg)"
          },
          "50%": {
            transform: "rotateZ(22.5deg)" 
          },
          "100%": {
            transform: "rotateZ(52.5deg)"
          }
        }
      },
      animation: {
        navbarLogoSpinAnimation: "navbarLogoSpinAnimation 150ms ease-in-out forwards" 
      }
    },
  },
  plugins: [],
};
export default config;
