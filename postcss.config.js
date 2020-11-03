module.exports = {
  plugins: [
    // require("postcss-preset-env")({ stage: 4 }),
    require('autoprefixer'),
    require("cssnano")({
      preset: "default",
    }),
  ],
};
