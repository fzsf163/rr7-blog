import { reactRouter } from "@react-router/dev/vite";
import dotenv from "dotenv";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
dotenv.config(); // load env vars from .env
export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  define: {
    // CLOUDINARY_CLOUD_NAME: `"${process.env.CLOUDINARY_CLOUD_NAME}"`,
    // CLOUDINARY_CLOUD_PRESET: `"${process.env.CLOUDINARY_CLOUD_PRESET}"`,
    // SESSION_SECRET: `"${process.env.SESSION_SECRET}"`,
    "process.env.SESSION_SECRET": `"${process.env.SESSION_SECRET}"`,
    "process.env.CLOUDINARY_CLOUD_NAME": `"${process.env.CLOUDINARY_CLOUD_NAME}"`,
    "process.env.CLOUDINARY_CLOUD_PRESET": `"${process.env.CLOUDINARY_CLOUD_PRESET}"`,
  },
});
