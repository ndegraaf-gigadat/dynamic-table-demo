/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2017: true,
    node: true,
    "vitest-globals/env": true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    project: "./tsconfig.eslint.json",
    // To enable all rules in Svelte files:
    extraFileExtensions: [".svelte"],
  },
  extends: [
    "eslint:recommended",
    "xo",
    "xo-typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:unicorn/recommended",
    "plugin:vitest-globals/recommended",
    "plugin:svelte/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "import/no-useless-path-segments": "error",
    "import/no-empty-named-blocks": "error",
    "import/no-absolute-path": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "unknown",
          "object",
          "type",
        ],
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    // Line length should be limited to 100 characters
    "max-len": [
      "error",
      {
        code: 100,
        comments: 100,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
        ignorePattern: "^import .*",
      },
    ],
    // Helps to have a clean and consistent code style
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
      {
        blankLine: "any",
        prev: ["const", "let"],
        next: ["const", "let"],
      },
      {
        blankLine: "always",
        prev: "*",
        next: "multiline-block-like",
      },
      {
        blankLine: "always",
        prev: "multiline-block-like",
        next: "*",
      },
    ],
  },
  overrides: [
    {
      files: ["src/lib/components/**/*.svelte"],
      rules: {
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              pascalCase: true,
            },
          },
        ],
      },
    },
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
};
