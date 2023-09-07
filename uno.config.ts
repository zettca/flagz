import { defineConfig } from "unocss";
import { presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  rules: [["flex-half", { flex: "1 calc(50% - 1rem)" }]],
});
