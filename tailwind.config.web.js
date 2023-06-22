/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('./tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  darkMode: 'class', // `darkMode` field can break mobile dark mode (tested in nativewind v2)
};
