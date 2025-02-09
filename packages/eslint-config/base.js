import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  prettierPlugin,
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      "no-var": "error",
      "prefer-const": ["error"],
      "sort-imports": [
        "error",
        {
          "ignoreCase": false,
          "ignoreDeclarationSort": true,
          "ignoreMemberSort": false,
          "memberSyntaxSortOrder": ["multiple", "single", "all", "none"],
          
        },
      ],
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always"

        }
      ]
    }
  }
);
