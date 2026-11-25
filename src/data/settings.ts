import { load, save } from "./storage";

export const MIN_FLAGS = 2;
export const MAX_FLAGS = 6;

export const CONTINENTS = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
] as const;

export type Settings = {
  numFlags: number;
  ignoreGuessed: boolean;
  /** Skips countries with very low population or area */
  ignoreMini: boolean;
  /** Empty means all continents */
  continents: string[];
};

const SETTINGS_KEY = "flagz:settings";

export const defaultSettings: Settings = {
  numFlags: 4,
  ignoreGuessed: false,
  ignoreMini: false,
  continents: [],
};

export const clampFlags = (n: unknown) =>
  Number.isInteger(n)
    ? Math.min(MAX_FLAGS, Math.max(MIN_FLAGS, n as number))
    : defaultSettings.numFlags;

export const loadSettings = (): Settings => {
  const saved = load<Partial<Settings> | null>(SETTINGS_KEY, null);
  return {
    numFlags: clampFlags(saved?.numFlags ?? defaultSettings.numFlags),
    ignoreGuessed:
      typeof saved?.ignoreGuessed === "boolean"
        ? saved.ignoreGuessed
        : defaultSettings.ignoreGuessed,
    ignoreMini:
      typeof saved?.ignoreMini === "boolean"
        ? saved.ignoreMini
        : defaultSettings.ignoreMini,
    continents: Array.isArray(saved?.continents)
      ? saved.continents.filter((c) => CONTINENTS.some((x) => x === c))
      : defaultSettings.continents,
  };
};

export const saveSettings = (settings: Settings) =>
  save(SETTINGS_KEY, settings);
