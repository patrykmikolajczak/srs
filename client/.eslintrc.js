module.exports = {
  root: true,
  env: {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true,
    'mocha': true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': [ 2, 'single' ],
    'semi': [ 2, 'never' ],
    'curly': 2,
    'brace-style': [ 2, '1tbs' ],
    'camelcase': [ 2, {
        'properties': 'never'
    } ],
    'comma-spacing': [ 2, {
        'before': false,
        'after': true
    } ],
    'comma-style': [ 2, 'last' ],
    'comma-dangle': [ 2, 'never' ],
    'key-spacing': [ 2, {
        'mode': 'strict',
        'beforeColon': false,
        'afterColon': true
    } ],
    'keyword-spacing': 2,
    'block-spacing': 2,
    'array-bracket-spacing': [ 2, 'always' ],
    'object-curly-spacing': [ 2, 'always' ],
    'computed-property-spacing': [ 2, 'always' ],
    'space-in-parens': [ 2, 'always' ],
    'space-before-function-paren': [ 2, 'never' ],
    'generator-star-spacing': [ 2, 'after' ],
    'yield-star-spacing': [ 2, 'after' ],
    'space-infix-ops': 2,
    'space-unary-ops': 2,
    'spaced-comment': [ 2, 'always' ],
    'arrow-spacing': [ 2, {
        'before': true,
        'after': true
    } ],
    'arrow-parens': [ 2, 'as-needed' ],
    'arrow-body-style': [ 2, 'as-needed' ],
    'no-trailing-spaces': 2,
    'no-multiple-empty-lines': [ 2, {
        'max': 1
    } ],
    'eol-last': 2,
    'valid-jsdoc': 2,
    'no-implicit-coercion': [ 2, {
        'allow': [ '!!' ]
    } ],
    'no-native-reassign': 2,
    'no-extend-native': 2,
    'wrap-iife': [ 2, 'outside' ],
    'yoda': [ 2, 'never' ],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'no-var': 2,
    'prefer-template': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'no-array-constructor': 2,
    'no-new-object': 2,
    'new-cap': 2,
    'new-parens': 2,
    'no-lonely-if': 2,
    'no-use-before-define': 2,
    'no-with': 2,
    'eqeqeq': [ 2, 'smart' ],
    'getter-return': [ 2, {
        'allowImplicit': true
    } ],
    'no-await-in-loop': 2,
    'dot-notation': 2,
    'no-proto': 2,
    'no-return-await': 2,
    'func-style': [ 2, 'declaration', {
        'allowArrowFunctions': true
    } ],
    'require-await': 2
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
