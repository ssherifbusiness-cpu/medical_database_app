/*
Brief:
This is ESLint's configuration file. ESLint is a javascript linter. This means that it applies rules to our code. These rules can come in the form of enforcing consistent coding conventions, like adding a space before the paramaters of a for loop "for() becomes for ()" It can also catch some bugs like unused variables and missing paranthesis
*/

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
