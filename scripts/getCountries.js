#!/usr/bin/env node

async function main() {
  // Thanks `restcountries` for the data 🙏
  const res = await fetch(
    "https://gitlab.com/restcountries/restcountries/-/raw/master/src/main/resources/countriesV4.json",
  );
  const data = await res.json();

  const filteredData = data
    .filter((c) => c.independent)
    .map((c) => ({
      code: c.cca2,
      flagUrl: c.flag.svg,
      name: c.name.common,
      alt: c.flag.alt,
      continents: c.continents,
      population: c.population,
      area: c.area,
    }));

  console.log(JSON.stringify(filteredData, null, 2));
}

main();
