const defaultTheme = require("tailwindcss/defaultTheme");
const resolveConfig = require("tailwindcss/resolveConfig");

/* @type {Config} */
module.export = {
   content: [],
   extend: defaultTheme,
   colors: {
      "dark-800": "#0E0F0E",
   },
   plugins: [require("tailwindcss-animate")],
};

// const theme = resolveConfig(config).theme;

// module.exports = 
//    config: config,
// };
