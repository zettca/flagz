import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno({ dark: "media" })],
  shortcuts: {
    button:
      "border-none cursor-pointer rounded text-white bg-gray-600 hover:bg-gray-700 disabled:text-gray-700 disabled:cursor-not-allowed disabled:hover:bg-gray-600",
  },
  rules: [["flex-half", { flex: "1 calc(50% - 1rem)" }]],
});
