module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:eslint-comments/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['prefer-arrow-functions'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'global-require': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/no-unescaped-entities': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'eslint-comments/no-unused-disable': 'warn',
    'max-len': 'off',
    // -- see: https://github.com/prettier/eslint-plugin-prettier -- //
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    // ------------------------------------------------------------- //
    'prefer-arrow-functions/prefer-arrow-functions': [
      'warn',
      {
        'allowNamedFunctions': false,
        'classPropertiesAllowed': false,
        'disallowPrototype': false,
        'returnStyle': 'unchanged',
        'singleReturnOnly': false,
      },
    ],
  },
};
