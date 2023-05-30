const defaultTheme = require("tailwindcss/defaultTheme");
const resolveConfig = require("tailwindcss/resolveConfig");

/** @type {import('tailwindcss').Config} */
const config = {
   theme: {
      extend: defaultTheme,
      colors: {
         "dark-800": "#0E0F0E",
         "dark-400": "#272727",
         "dark-300": "#3E3F3E",
      },
   },
   plugins: [
      require("tailwindcss-animate"),
      require("@tailwindcss/container-queries"),
      require("@tailwindcss/line-clamp"),
   ],
};

const theme = resolveConfig(config).theme;

module.exports = {
   config,
   theme,
};
