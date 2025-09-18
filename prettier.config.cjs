/** @type {import("prettier").Config} */
module.exports = {
  semi: true, // Add semicolons at the end of statements
  singleQuote: false, // Use double quotes for consistency with JSX
  trailingComma: "all", // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  printWidth: 100, // Max line length before wrapping
  tabWidth: 2, // Number of spaces per indentation level
  useTabs: false, // Use spaces instead of tabs
  bracketSpacing: true, // Print spaces between brackets in object literals
  arrowParens: "always", // Always include parentheses around arrow function parameters
  jsxSingleQuote: false, // Use double quotes in JSX
  jsxBracketSameLine: false, // Put the `>` of a multi-line JSX element at the end of the last line
  endOfLine: "auto", // Maintain existing line endings (useful for cross-platform projects)
  importOrder: ["^react$", "^@?\\w", "^(@|@src)(/.*|$)", "^[./]"], // Custom import sorting
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
