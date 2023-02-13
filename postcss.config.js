/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.web.js'),
    require('autoprefixer'),
  ],
};
