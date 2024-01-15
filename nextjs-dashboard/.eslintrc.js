module.exports = {
  extends: [
    "next/core-web-vitals",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["prefer-arrow-functions"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "global-require": "off",
    "@typescript-eslint/no-shadow": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/no-unescaped-entities": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "react/function-component-definition": "off",
    "prefer-arrow-functions/prefer-arrow-functions": [
      "warn",
      {
        "allowNamedFunctions": false,
        "classPropertiesAllowed": false,
        "disallowPrototype": false,
        "returnStyle": "unchanged",
        "singleReturnOnly": false
      }
    ]
  },
};
