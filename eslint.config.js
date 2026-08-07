import eslint from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["dist/**"],
  },
  eslint.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: "module",
    },
    rules: {
      "no-console": "error",
    },
  },
  {
    // CI scripts are command-line tools: printing to the console is the whole
    // point of them, and their output is what shows up in the Actions log.
    files: ["scripts/**"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-console": "off",
    },
  },
];
