import countriesJson from "../assets/countries.json";
import { shuffleArray } from "../utils";

const countries = countriesJson
  .filter((c) => c.independent)
  .map((c) => ({
    code: c.cca2,
    flagUrl: c.flags.svg,
    name: c.name.common,
    alt: c.flags.alt,
  }));

export const getCountries = (num = 4) => {
  return shuffleArray(countries).slice(0, num);
};
