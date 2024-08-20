import unoCSS from "unocss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid(), unoCSS()],
  base: "./",
});
