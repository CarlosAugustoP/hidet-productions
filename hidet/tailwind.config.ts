import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Added from the second config
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    debugScreens: {
      position: ["bottom", "left"],
    },
    extend: {
      colors: {
        // Merged colors from both configurations
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // If you want to include the colors from the first config without `hsl()`
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
      fontSize: {
        // Merged font sizes from both configurations
        "custom-md-lg": "1.125rem",
        "custom-3xl-4xl": "2.35rem",
        "custom-5xl-6xl": "3.35rem",
        "custom-xs-sm": "0.8125rem",
        "huge": "5.5rem",
        "xl-2xl": "1.375rem",
      },
	  height: {
		'128': '30rem',
	  }
    },
    screens: {
      // Screens are the same in both configurations
      xs: { max: "450px" },
      sm: "451px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      
    },
  },
  plugins: [
    require("tailwindcss-debug-screens"),
    require("tailwindcss-animate"), // Added from the second configuration
  ],
};

export default config;
