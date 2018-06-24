module.exports = {
  map: true,
  plugins: [
    require("postcss-preset-env")({
      features: {
        "nesting-rules": true
      }
    })
  ]
};
