import countries from "../assets/countries.json";
import { rand, shuffleArray } from "../utils";

const MINI_POPULATION = 200_000;
const MINI_AREA_KM2 = 500;

const isMini = (c: { population: number; area: number }) =>
  c.population < MINI_POPULATION || c.area < MINI_AREA_KM2;

type Filters = {
  /** No continents means all */
  continents?: readonly string[];
  ignoreMini?: boolean;
};

export const filterCountries = ({
  continents = [],
  ignoreMini = false,
}: Filters = {}) =>
  countries.filter(
    (c) =>
      (!continents.length ||
        c.continents.some((x) => continents.includes(x))) &&
      !(ignoreMini && isMini(c)),
  );

/**
 * Builds a game with `num` countries and a random answer among them.
 * Countries come from those matching `filters`.
 * Answer is picked from countries not in `excludeCodes`, unless all are excluded.
 */
export const getGame = (
  num = 4,
  {
    excludeCodes = new Set<string>(),
    ...filters
  }: Filters & { excludeCodes?: ReadonlySet<string> } = {},
) => {
  const all = filterCountries(filters);
  const available = all.filter((c) => !excludeCodes.has(c.code));
  const pool = available.length ? available : all;
  const answer = pool[rand(pool.length - 1)];

  const others = shuffleArray(all.filter((c) => c !== answer)).slice(
    0,
    num - 1,
  );
  const answerIndex = rand(others.length);
  others.splice(answerIndex, 0, answer);

  return { countries: others, answerIndex };
};
