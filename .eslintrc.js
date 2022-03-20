module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    "prettier",
    "react",
    "@typescript-eslint",
    "@typescript-eslint/eslint-plugin",
  ],
  extends: [
    "prettier",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        arrowParens: "avoid",
      },
    ],
    "no-unused-vars": "off",
    "import/namespace": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
};
