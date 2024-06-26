const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        0: [
          "0px",
          {
            letterSpacing: "0px",
          },
        ],
        xxsm: [
          ".5rem",
          {
            lineHeight: "14px",
          },
        ],
        xsm: [
          ".75rem",
          {
            lineHeight: "21px",
          },
        ],
        sm: [
          ".875rem",
          {
            lineHeight: "24.5px",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "28px",
          },
        ],
        md: [
          "1.125rem",
          {
            lineHeight: "31.5px",
          },
        ],
        lg: [
          "1.25rem",
          {
            lineHeight: "35px",
          },
        ],

        xl: [
          "1.5rem",
          {
            lineHeight: "42px",
          },
        ],

        "2xl": [
          "2rem",
          {
            lineHeight: "56px",
          },
        ],

        "3xl": [
          "2.5rem",
          {
            lineHeight: "70px",
          },
        ],

        "4xl": [
          "3.5rem",
          {
            lineHeight: "98px",
          },
        ],
      },
      colors: {
        gray: {
          100: "#F9F9F9",
          200: "#F0F0F0",
          300: "#D1D5DB",
          400: "#666666",
          500: "#333333",
          600: "#0F172A", // extra
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        info: "#3FA2F7",
        positive: "#56C568",
        negative: "#EB5757",
        warning: "#FFC400",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        min1700: { min: "1700px" },
        "2xlmx": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        xxlmx: { max: "1359px" },

        xlmx: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lgmax1053: { max: "1053px" },

        lgmx: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        mdmax992: { max: "992px" },

        mdmin800: { min: "800px" },

        mdmax800: { max: "800px" },

        mdmin850: { min: "850px" },

        mdmax850: { max: "850px" },

        mdmx: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        smmx: { max: "599px" },
        // => @media (max-width: 639px) { ... }

        xsmmx: { max: "479px" },

        xxsmmx: { max: "400px" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
