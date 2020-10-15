module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ['./src/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {},
  },
  variants: ['responsive', 'group-hover', 'disabled', 'hover', 'focus', 'active'],
  plugins: [],
};
