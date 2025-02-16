import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import tsParser from "@typescript-eslint/parser";

export default tseslint.config(
  // Base ESLint configurations
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettierPlugin,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
  },
  // Language and parser options
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Disable type checking for certain file patterns
  {
    files: ["**/*.types.ts", "**/*.js", "**/*.mjs"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    rules: {
      "prefer-arrow-callback": "error", // Enforce arrow functions for callbacks
      "func-style": ["error", "declaration"],
      "@typescript-eslint/no-misused-promises": "off",
      "no-var": "error", // Enforces the use of let or const instead of var
      "prefer-const": [
        "error",
        {
          destructuring: "all", // Applies to destructured variables as well
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["multiple", "single", "all", "none"],
        },
      ],
    },
  },

  {
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
);
