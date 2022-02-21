const fs = require('fs');

let currentChallenge = '';
let completedChallenges = [
];

const basicHTML = 'basic-html-and-html5';
const basicCSS = 'basic-css';
const appliedVisualDesign = 'applied-visual-design';
const appliedAccessibility = 'applied-accessibility';
const responsiveWebDesignPrinciples = 'responsive-web-design-principles';
const cssFlexbox = 'css-flexbox';
const cssGrid = 'css-grid';

const titles = {
  'basic-html-and-html5': [
    'say-hello-to-html-elements',
    'headline-with-the-h2-element',
    'inform-with-the-paragraph-element',
    'fill-in-the-blank-with-placeholder-text',
    'uncomment-html',
    'comment-out-html',
    'delete-html-elements',
    'introduction-to-html5-elements',
    'add-images-to-your-website',
    'link-to-external-pages-with-anchor-elements',
    'link-to-internal-sections-of-a-page-with-anchor-elements',
    'nest-an-anchor-element-within-a-paragraph',
    'make-dead-links-using-the-hash-symbol',
    'turn-an-image-into-a-link',
    'create-a-bulleted-unordered-list',
    'create-an-ordered-list',
    'create-a-text-field',
    'add-placeholder-text-to-a-text-field',
    'create-a-form-element',
    'add-a-submit-button-to-a-form',
    'use-html5-to-require-a-field',
    'create-a-set-of-radio-buttons',
    'create-a-set-of-checkboxes',
    'use-the-value-attribute-with-radio-buttons-and-checkboxes',
    'check-radio-buttons-and-checkboxes-by-default',
    'nest-many-elements-within-a-single-div-element',
    'declare-the-doctype-of-an-html-document',
    'define-the-head-and-body-of-an-html-document',
  ],
  'basic-css': [
    'change-the-color-of-text',
    'use-css-selectors-to-style-elements',
    'use-a-css-class-to-style-an-element',
    'style-multiple-elements-with-a-css-class',
    'change-the-font-size-of-an-element',
    'set-the-font-family-of-an-element',
    'import-a-google-font',
    'specify-how-fonts-should-degrade',
    'size-your-images',
    'add-borders-around-your-elements',
    'add-rounded-corners-with-border-radius',
    'make-circular-images-with-a-border-radius',
    'give-a-background-color-to-a-div-element',
    'set-the-id-of-an-element',
    'use-an-id-attribute-to-style-an-element',
    'adjust-the-padding-of-an-element',
    'adjust-the-margin-of-an-element',
    'add-a-negative-margin-to-an-element',
    'add-different-padding-to-each-side-of-an-element',
    'add-different-margins-to-each-side-of-an-element',
    'use-clockwise-notation-to-specify-the-padding-of-an-element',
    'use-clockwise-notation-to-specify-the-margin-of-an-element',
    'use-attribute-selectors-to-style-elements',
    'understand-absolute-versus-relative-units',
    'style-the-html-body-element',
    'inherit-styles-from-the-body-element',
    'prioritize-one-style-over-another',
    'override-styles-in-subsequent-css',
    'override-class-declarations-by-styling-id-attributes',
    'override-class-declarations-with-inline-styles',
    'override-all-other-styles-by-using-important',
    'use-hex-code-for-specific-colors',
    'use-hex-code-to-mix-colors',
    'use-abbreviated-hex-code',
    'use-rgb-values-to-color-elements',
    'use-rgb-to-mix-colors',
    'use-css-variables-to-change-several-elements-at-once',
    'create-a-custom-css-variable',
    'use-a-custom-css-variable',
    'attach-a-fallback-value-to-a-css-variable',
    'improve-compatibility-with-browser-fallbacks',
    'inherit-css-variables',
    'change-a-variable-for-a-specific-area',
    'use-a-media-query-to-change-a-variable',
  ],
  'applied-visual-design': ['create-visual-balance-using-the-text-align-property', 'adjust-the-width-of-an-element-using-the-width-property', 'adjust-the-height-of-an-element-using-the-height-property', 'use-the-strong-tag-to-make-text-bold', 'use-the-u-tag-to-underline-text', 'use-the-em-tag-to-italicize-text', 'use-the-s-tag-to-strikethrough-text', 'create-a-horizontal-line-using-the-hr-element', 'adjust-the-background-color-property-of-text', 'adjust-the-size-of-a-heading-element-versus-a-paragraph-element', 'add-a-box-shadow-to-a-card-like-element', 'decrease-the-opacity-of-an-element', 'use-the-text-transform-property-to-make-text-uppercase', 'set-the-font-size-for-multiple-heading-elements', 'set-the-font-weight-for-multiple-heading-elements', 'set-the-font-size-of-paragraph-text', 'set-the-line-height-of-paragraphs', 'adjust-the-hover-state-of-an-anchor-tag', 'change-an-elements-relative-position', 'move-a-relatively-positioned-element-with-css-offsets', 'lock-an-element-to-its-parent-with-absolute-positioning', 'lock-an-element-to-the-browser-window-with-fixed-positioning', 'push-elements-left-or-right-with-the-float-property', 'change-the-position-of-overlapping-elements-with-the-z-index-property', 'center-an-element-horizontally-using-the-margin-property', 'learn-about-complementary-colors', 'learn-about-tertiary-colors', 'adjust-the-color-of-various-elements-to-complementary-colors', 'adjust-the-hue-of-a-color', 'adjust-the-tone-of-a-color', 'create-a-gradual-css-linear-gradient', 'use-a-css-linear-gradient-to-create-a-striped-element', 'create-texture-by-adding-a-subtle-pattern-as-a-background-image', 'use-the-css-transform-scale-property-to-change-the-size-of-an-element', 'use-the-css-transform-scale-property-to-scale-an-element-on-hover', 'use-the-css-transform-property-skewx-to-skew-an-element-along-the-x-axis', 'use-the-css-transform-property-skewy-to-skew-an-element-along-the-y-axis', 'create-a-graphic-using-css', 'create-a-more-complex-shape-using-css-and-html', 'learn-how-the-css-keyframes-and-animation-properties-work', 'use-css-animation-to-change-the-hover-state-of-a-button', 'modify-fill-mode-of-an-animation', 'create-movement-using-css-animation', 'create-visual-direction-by-fading-an-element-from-left-to-right', 'animate-elements-continually-using-an-infinite-animation-count', 'make-a-css-heartbeat-using-an-infinite-animation-count', 'animate-elements-at-variable-rates', 'animate-multiple-elements-at-variable-rates', 'change-animation-timing-with-keywords', 'learn-how-bezier-curves-work', 'use-a-bezier-curve-to-move-a-graphic', 'make-motion-more-natural-using-a-bezier-curve'],
  'applied-accessibility': ['add-a-text-alternative-to-images-for-visually-impaired-accessibility', 'know-when-alt-text-should-be-left-blank', 'use-headings-to-show-hierarchical-relationships-of-content', 'jump-straight-to-the-content-using-the-main-element', 'wrap-content-in-the-article-element', 'make-screen-reader-navigation-easier-with-the-header-landmark', 'make-screen-reader-navigation-easier-with-the-nav-landmark', 'make-screen-reader-navigation-easier-with-the-footer-landmark', 'improve-accessibility-of-audio-content-with-the-audio-element', 'improve-chart-accessibility-with-the-figure-element', 'improve-form-field-accessibility-with-the-label-element', 'wrap-radio-buttons-in-a-fieldset-element-for-better-accessibility', 'add-an-accessible-date-picker', 'standardize-times-with-the-html5-datetime-attribute', 'make-elements-only-visible-to-a-screen-reader-by-using-custom-css', 'improve-readability-with-high-contrast-text', 'avoid-colorblindness-issues-by-using-sufficient-contrast', 'avoid-colorblindness-issues-by-carefully-choosing-colors-that-convey-information', 'give-links-meaning-by-using-descriptive-link-text', 'make-links-navigable-with-html-access-keys', 'use-tabindex-to-add-keyboard-focus-to-an-element', 'use-tabindex-to-specify-the-order-of-keyboard-focus-for-several-elements'],
  'responsive-web-design-principles': ['create-a-media-query', 'make-an-image-responsive', 'use-a-retina-image-for-higher-resolution-displays', 'make-typography-responsive'],
  'css-flexbox': ['use-display-flex-to-position-two-boxes', 'add-flex-superpowers-to-the-tweet-embed', 'use-the-flex-direction-property-to-make-a-row', 'apply-the-flex-direction-property-to-create-rows-in-the-tweet-embed', 'use-the-flex-direction-property-to-make-a-column', 'apply-the-flex-direction-property-to-create-a-column-in-the-tweet-embed', 'align-elements-using-the-justify-content-property', 'use-the-justify-content-property-in-the-tweet-embed', 'align-elements-using-the-align-items-property', 'use-the-align-items-property-in-the-tweet-embed', 'use-the-flex-wrap-property-to-wrap-a-row-or-column', 'use-the-flex-shrink-property-to-shrink-items', 'use-the-flex-grow-property-to-expand-items', 'use-the-flex-basis-property-to-set-the-initial-size-of-an-item', 'use-the-flex-shorthand-property', 'use-the-order-property-to-rearrange-items', 'use-the-align-self-property'],
  'css-grid': ['create-your-first-css-grid', 'add-columns-with-grid-template-columns', 'add-rows-with-grid-template-rows', 'use-css-grid-units-to-change-the-size-of-columns-and-rows', 'create-a-column-gap-using-grid-column-gap', 'create-a-row-gap-using-grid-row-gap', 'add-gaps-faster-with-grid-gap', 'use-grid-column-to-control-spacing', 'use-grid-row-to-control-spacing', 'align-an-item-horizontally-using-justify-self', 'align-an-item-vertically-using-align-self', 'align-all-items-horizontally-using-justify-items', 'align-all-items-vertically-using-align-items', 'divide-the-grid-into-an-area-template', 'place-items-in-grid-areas-using-the-grid-area-property', 'use-grid-area-without-creating-an-areas-template', 'reduce-repetition-using-the-repeat-function', 'limit-item-size-using-the-minmax-function', 'create-flexible-layouts-using-auto-fill', 'create-flexible-layouts-using-auto-fit', 'use-media-queries-to-create-responsive-layouts', 'create-grids-within-grids'],
};

const JSONDocument = Object.keys(titles).map((title) => {
  return titles[title].map((challenge) => `https://www.freecodecamp.org/learn/responsive-web-design/${title}/${challenge}`);
});

console.log(JSONDocument.flat());

fs.writeFile('challenges.json', JSON.stringify(JSONDocument.flat()), function (err) {
  if (err) throw err;
  console.log('complete');
});
