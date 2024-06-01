#!/usr/bin/env node

async function main() {
  // Thanks `restcountries` for the data 🙏
  const res = await fetch(
    "https://gitlab.com/restcountries/restcountries/-/raw/master/src/main/resources/countriesV3.1.json"
  );
  const data = await res.json();

  const filteredData = data
    .filter((c) => c.independent)
    .map((c) => ({
      code: c.cca2,
      flagUrl: c.flags.svg,
      name: c.name.common,
      alt: c.flags.alt,
    }));

  console.log(JSON.stringify(filteredData, null, 2));
}

main();
