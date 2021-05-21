/* eslint-env node */
module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true,
      "cypress/globals": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react", "jest", "cypress"
  ],
  "rules": {
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "warn",
          "single"
      ],
      "semi": [
          "warn",
          "never"
      ],
      "eqeqeq": "warn",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "warn", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
