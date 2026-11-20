import solid from "@solidjs/vite-plugin";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid(), unoCSS()],
  base: "./",
});
