import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      // **1. Enforce Arrow Function Usage**
      "prefer-arrow-callback": ["error"],

      // **2. Enforce Alphabetical Sorting for Imports**
      "sort-imports": [
        "error",
        {
          "ignoreCase": false,
          "ignoreDeclarationSort": false,
          "ignoreMemberSort": false,
          "memberSyntaxSortOrder": ["multiple", "single", "all", "none"],
        }
      ],

      // **3. Allow Only `let` and `const` (No `var`)**
      "no-var": "error",
      "prefer-const": ["error"],

      // **4. Enforce Multiple Imports Before Single**
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
