/**
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
 * Dependencies
 *
 * postcss-cssnext
 * PostCSS plugin to use tomorrow's CSS syntax, today.
 * @see https://github.com/MoOx/postcss-cssnext
 *
 * postcss-css-variables
 * PostCSS plugin to transform CSS Custom Properties (CSS variables) syntax into a static representation.
 * @see https://www.npmjs.com/package/postcss-css-variables
 *
 * postcss-import
 * PostCSS plugin to inline @import rules content
 * @see https://github.com/postcss/postcss-import
 *
 * postcss-url
 * PostCSS plugin to rebase url(), inline or copy asset.
 * @see https://github.com/postcss/postcss-url
 *
 * css-declaration-sorter
 * Sort CSS declarations fast and automatically in a certain order.
 * @see https://github.com/Siilwyn/css-declaration-sorter
 *
 * css-mqpacker
 * A tool for packing same CSS media query rules into one with PostCSS
 * @see https://github.com/hail2u/node-css-mqpacker
 *
 * postcss-nested
 * PostCSS plugin to unwrap nested rules like how Sass does it.
 * @see https://github.com/postcss/postcss-nested
 *
 * postcss-color-alpha
 * PostCSS plugin to transform color from #rgb.a to rgba()
 * @see https://github.com/avanes/postcss-color-alpha
 *
 * postcss-extend
 * A PostCSS plugin to minimize the number of repeat-selectors and rules you write
 * @see https://github.com/travco/postcss-extend
 *
 * postcss-remove-root
 * A PostCSS plugin to remove all instances of “:root” from a stylesheet.
 * @see https://github.com/cbracco/postcss-remove-root
 *
 * postcss-animation
 * PostCSS plugin that adds `@keyframes` from animate.css.
 * @see https://github.com/zhouwenbin/postcss-animation
 *
 * postcss-discard-empty
 * Discard empty rules and values with PostCSS.
 * @see https://github.com/ben-eb/postcss-discard-empty
 *
 * postcss-custom-properties
 * PostCSS plugin to transform W3C CSS Custom Properties for cascading variables
 * @see https://github.com/postcss/postcss-custom-properties
 */

// CSS
const cssnext = require("postcss-cssnext");
const mqpacker = require("css-mqpacker");

// Post CSS
const postcss = require('postcss');
const colorAlpha = require('postcss-color-alpha');
const animation = require('postcss-animation');
const extend = require('postcss-extend');
const discardEmpty = require('postcss-discard-empty');
const removeRoot = require('postcss-remove-root');
const importCss = require("postcss-import");
const url = require("postcss-url");
const variables = require("postcss-css-variables");
const nested = require("postcss-nested");
const sortDeclarations = require("css-declaration-sorter");
// const customProperties = require("postcss-custom-properties");

module.exports = (ctx) => {
  return {
    // ...options // PostCSS Options [optional]
    plugins: [
      postcss.plugin('fix-escaping-error', (opts) => (css, result) => {
        css.walkRules(rule => {
          rule.selector = rule.selector.replace(/\\--/gi, '--');
        });
      }),
      cssnext({
        browsers:[
          '> 1%',
          'last 2 versions',
          'Firefox ESR',
          'Opera 12.1',
          'iOS >= 8'
        ]
      }),
      // customProperties(),
      colorAlpha(),
      extend(),
      discardEmpty(),
      removeRoot(),
      // sortDeclarations({
      //   order: "concentric-css"
      // }),
      mqpacker({
        sort: true
      }),
      importCss(),
      url({
        url: 'rebase',
        dir: {
          from: '/assets/',
          to: './'
        }
      }),
      animation(),
      variables(),
      nested(),
    ]
  }
};
