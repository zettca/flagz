import countriesJsonRaw from "../assets/countries.json";
import { Country } from "../types";
import { shuffleArray } from "../utils";

// @ts-ignore
const countriesJson: Country[] = countriesJsonRaw;

const shortCountry = (c: Country) => ({
  code: c.cca2,
  flagUrl: c.flags.svg,
  name: c.name.common,
});

export const getCountries = (num = 4) => {
  return shuffleArray(countriesJson).slice(0, num).map(shortCountry);
};
