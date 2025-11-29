import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "xiao-pink": "#FF6B9D",
        "xiao-green": "#22C55E",
        "xiao-red": "#EF4444",
        "xiao-yellow": "#EAB308",
        "xiao-blue": "#3B82F6",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
