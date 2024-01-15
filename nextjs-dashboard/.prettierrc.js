
/**
 * Remember to restart VSCode after making
 * any changes here and saving this file.
 */
module.exports = {
  arrowParens: "always",
  quoteProps: "preserve",
  bracketSameLine: false,
  endOfLine: "lf",
  importOrder: [
    "^~/styles/(.*)$",
    "",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/components/(.*)$",
    "^@/config/(.*)$",
    "^@/containers/(.*)$",
    "^@/hooks/(.*)$",
    "^@/validations/(.*)$",
    "^@/utils/(.*)$",
    "^@/env/(.*)$",
    "",
    "^[./]",
    "",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss" // MUST come last
  ],
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  importOrderSeparation: true,
  importOrderCaseInsensitive: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
};
