import { heroui } from "@heroui/react";
import twt from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {},
      },
    }),
    twt(),
  ],
} satisfies Config;
