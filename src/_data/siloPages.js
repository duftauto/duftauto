const silos = require("./silos.json");
const neighbourhoods = require("./neighbourhoods.json");

// Cartesian product: every silo x every neighbourhood = one SLP each.
// 7 silos x 17 neighbourhoods = 119 pages.
module.exports = () => {
  const pages = [];
  for (const silo of silos) {
    for (const hood of neighbourhoods) {
      pages.push({ silo, hood });
    }
  }
  return pages;
};
