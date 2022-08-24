const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8")
);

module.exports = {
  extends: ["prettier"],
  plugins: ["react", "prettier"],
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
  },
};
