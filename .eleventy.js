module.exports = function (eleventyConfig) {
  // Copy static assets (CSS, images, video, reviews export) straight into the output folder —
  // Eleventy won't try to parse these as templates.
  eleventyConfig.addPassthroughCopy("src/assets");
  // Netlify reads this at the site root to apply 301 redirects — /auto-repair/ has no
  // page of its own (unlike the 6 service silos, which each already have a parent page
  // sitting at their own root), so it needs an explicit redirect to the homepage.
  eleventyConfig.addPassthroughCopy("src/_redirects");

  // Builds "<keyword> - <brand>" for the <title> tag, per SKILL-META's 60-char rule.
  // Three-tier fallback: full brand name, then the shorter brand, then no brand suffix
  // at all (keyword alone) — SLP titles like "Engine Modifications for Chilliwack River
  // Valley Car Owners" are long enough on their own that even the short brand overflows.
  eleventyConfig.addFilter("pageTitle", function (keyword, brand, brandShort) {
    const full = keyword + " - " + brand;
    if (full.length <= 60) return full;
    const short = keyword + " - " + brandShort;
    if (short.length <= 60) return short;
    return keyword;
  });

  return {
    dir: {
      input: "src",        // source templates live here
      output: "dist",      // built site is written here
      includes: "_includes", // layouts + partials, relative to input
      data: "_data",        // global data files, relative to input
    },
  };
};
