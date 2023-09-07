import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import unoCSS from "unocss/vite";

export default defineConfig({
  plugins: [solid(), unoCSS()],
  base: "./",
});
