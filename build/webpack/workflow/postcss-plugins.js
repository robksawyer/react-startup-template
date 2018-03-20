/**
 * postcss-plugins.js
 *
 * Post CSS Configuration
 *
 * The postcss tool itself is a Node.js module that parses CSS into an abstract syntax
 * tree (AST); passes that AST through any number of “plugin” functions; and
 * then converts that AST back into a string, which you can output to a file.
 * Each function the AST passes through may or may not transform it; sourcemaps
 * will be generated to keep track of any changes.
 *
 * @see http://davidtheclark.com/its-time-for-everyone-to-learn-about-postcss/
 *
 * Configures PostCSS plugins for all webpack builds.
 * The settings here map to the `postcss` property on the webpack configuration.
 * These plugins apply to all webpack configurations for both the
 * site and styleguide.
 *
 * Dependencies
 *
 * css-declaration-sorter
 * Sort CSS declarations fast and automatically in a certain order.
 * @see https://github.com/Siilwyn/css-declaration-sorter
 *
 * css-mqpacker
 * A tool for packing same CSS media query rules into one with PostCSS
 * @see https://github.com/hail2u/node-css-mqpacker
 *
 * postcss-cssnext
 * PostCSS plugin to use tomorrow's CSS syntax, today.
 * @see https://github.com/MoOx/postcss-cssnext
 *
 * postcss-css-variables
 * PostCSS plugin to transform CSS Custom Properties (CSS variables) syntax
 * into a static representation.
 * @see https://www.npmjs.com/package/postcss-css-variables
 *
 * postcss-import
 * PostCSS plugin to inline @import rules content
 * @see https://github.com/postcss/postcss-import
 *
 * postcss-extend
 * A PostCSS plugin to minimize the number of repeat-selectors and rules you write.
 * @see
 * postcss-url
 * PostCSS plugin to rebase url(), inline or copy asset.
 * @see https://github.com/postcss/postcss-url
 *
 * postcss-nested
 * PostCSS plugin to unwrap nested rules like how Sass does it.
 * @see https://github.com/postcss/postcss-nested
 *
 * postcss-color-alpha
 * PostCSS plugin to transform color from #rgb.a to rgba()
 * @see https://github.com/avanes/postcss-color-alpha
 *
 * postcss-animation
 * PostCSS plugin that adds `@keyframes` from animate.css.
 * @see https://github.com/zhouwenbin/postcss-animation
 *
 * postcss-discard-empty
 * Discard empty rules and values with PostCSS.
 * @see https://github.com/ben-eb/postcss-discard-empty
 *
 */
// CSS
const cssDeclarationSorter = require("css-declaration-sorter");
const cssMQPacker = require('css-mqpacker');

// Post CSS
const postcss = require('postcss');
const postcssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssUrl = require('postcss-url');
const postcssColorAlpha = require('postcss-color-alpha');
const postcssVariables = require('postcss-css-variables');
const postcssExtend = require('postcss-extend');
const postcssDiscardEmpty = require('postcss-discard-empty');
const postcssRemoveRoot = require('postcss-remove-root');
const postcssAnimation = require('postcss-animation');

module.exports = [
  postcss.plugin('fix-escaping-error',
    (opts) => (css, result) => {
      css.walkRules(rule => {
        rule.selector = rule.selector.replace(/\\--/gi, '--');
      });
    }
  ),
  postcssNext(),
  // postcssNext({
  //   browsers:[
  //     '> 1%',
  //     'last 2 versions',
  //     'Firefox ESR',
  //     'Opera 12.1',
  //     'iOS >= 8'
  //   ]
  // }),
  cssDeclarationSorter({
    order: 'concentric-css'
  }),
  // postcssColorAlpha(),
  // postcssExtend(),
  // postcssDiscardEmpty(),
  // postcssRemoveRoot(),
  cssMQPacker({
    sort: true
  }),
  postcssImport(),
  postcssUrl('inline'),
  // postcssAnimation(),
  postcssVariables(),
  postcssNested(),
];
