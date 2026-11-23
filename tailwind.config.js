/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        background: "#090a0d",
        surface: "#0f1115",
        "surface-raised": "#14171f",
        border: "#222631",
        claude: {
          warm: "#e4e4e7",
          amber: "#d4d4d8",
          sand: "#f4f4f5",
          stone: "#27272a",
        },
        grok: {
          dark: "#090a0d",
          surface: "#12141a",
          border: "#232732",
          cyan: "#d4d4d8",
          alabaster: "#f4f4f5",
        },
        gpt: {
          emerald: "#e4e4e7",
          obsidian: "#0d0e11",
        },
      },
    },
  },
  plugins: [],
}