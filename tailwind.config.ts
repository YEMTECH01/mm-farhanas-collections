import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        ivory: "#F6F1E7",
        sand: "#E9DFCB",
        gold: {
          DEFAULT: "#C9A96E",
          deep: "#A8864A",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "2px",
        md: "2px",
        lg: "2px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(11, 11, 12, 0.05)",
        float: "0 10px 30px -5px rgba(11, 11, 12, 0.15)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(135deg, #C9A96E 0%, #E3C99B 50%, #C9A96E 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
