import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import baseConfig from "./base.js";

export default [
  // Base configuration
  ...baseConfig,

  // Accessibility rules
  jsxA11y.flatConfigs.recommended,

  // React-specific rules
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "function-expression",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // React Hooks rules
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },

  // Next.js-specific rules
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Ignore Next.js build folder
  {
    ignores: [".next/*"],
  },
];