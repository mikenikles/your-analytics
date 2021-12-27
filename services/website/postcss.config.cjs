const tailwind = require("tailwindcss");
const cssnano = require("cssnano");
const presetEnv = require("postcss-preset-env")();
const autoprefixer = require("autoprefixer");

const plugins =
  process.env.NODE_ENV === "production"
    ? [tailwind, presetEnv, autoprefixer, cssnano]
    : [tailwind, presetEnv];

module.exports = { plugins };
