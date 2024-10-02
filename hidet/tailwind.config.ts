import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    debugScreens: {
      position: ['bottom', 'left'],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        'custom-md-lg': '1.125rem', 
        'custom-3xl-4xl': '2.35rem',
        'custom-5xl-6xl': '3.35rem',
        'custom-xs-sm': '0.8125rem', 
        'huge': '5.5rem'
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ],
};

export default config;
