const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"),
);

module.exports = {
  extends: [
    "react-app",
    "prettier",
    "prettier/react",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  plugins: ["react", "prettier", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.ts", "*.tsx", "**/*.ts?(x)"], // Your TypeScript files extension
      rules: { "prettier/prettier": ["warn", prettierOptions] },
      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
  ignorePatterns: ["node_modules/", "build/", "app.json", ".eslintrc.js"],
  rules: {
    "prettier/prettier": [
      "error",
      prettierOptions,
      {
        endOfLine: "auto",
      },
    ],
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
  },
};
