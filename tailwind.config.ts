const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "src/pages/**/*.{ts,tsx}",
    "src/components/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xs: "500px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        "twitter-chirp": ["TwitterChirp", "sans-serif"],
        "twitter-chirp-extended": ["TwitterChirpExtendedHeavy", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
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
        "main-primary": "rgb(var(--main-primary) / <alpha-value>)",
        "main-secondary": "rgb(var(--main-secondary) / <alpha-value>)",
        "main-background": "rgb(var(--main-background) / <alpha-value>)",
        "main-search-background":
          "rgb(var(--main-search-background) / <alpha-value>)",
        "main-sidebar-background":
          "rgb(var(--main-sidebar-background) / <alpha-value>)",
        "main-accent": "rgb(var(--main-accent) / <alpha-value>)",
        "accent-yellow": "rgb(var(--accent-yellow) / <alpha-value>)",
        "accent-blue": "rgb(var(--accent-blue) / <alpha-value>)",
        "accent-pink": "rgb(var(--accent-pink) / <alpha-value>)",
        "accent-purple": "rgb(var(--accent-purple) / <alpha-value>)",
        "accent-orange": "rgb(var(--accent-orange) / <alpha-value>)",
        "accent-green": "rgb(var(--accent-green) / <alpha-value>)",
        dark: "rgb(var(--dark-background))",
        dim: "rgb(var(--dim-background))",
        light: "rgb(var(--light-background))",
        "accent-red": "#F4212E",
        "dark-primary": "#E7E9EA",
        "dark-secondary": "#71767B",
        "light-primary": "#0F1419",
        "light-secondary": "#536471",
        "dark-border": "#2F3336",
        "light-border": "#EFF3F4",
        "dark-line-reply": "#333639",
        "light-line-reply": "#CFD9DE",
        "twitter-icon": "#D6D9DB",
        "image-preview-hover": "#272C30",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // keyframes: {
      //   "accordion-down": {
      //     from: { height: 0 },
      //     to: { height: "var(--radix-accordion-content-height)" },
      //   },
      //   "accordion-up": {
      //     from: { height: "var(--radix-accordion-content-height)" },
      //     to: { height: 0 },
      //   },
      // },
      // animation: {
      //   "accordion-down": "accordion-down 0.2s ease-out",
      //   "accordion-up": "accordion-up 0.2s ease-out",
      // },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ addVariant }: any) => {
      addVariant("inner", "& > *");
    },
  ],
};
