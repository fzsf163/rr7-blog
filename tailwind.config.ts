import { nextui } from "@nextui-org/react";
import twt from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {},
      },
    }),
    twt(),
  ],
} satisfies Config;
