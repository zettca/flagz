import countries from "../assets/countries.json";
import { shuffleArray } from "../utils";

export const getCountries = (num = 4) => {
  return shuffleArray(countries).slice(0, num);
};
