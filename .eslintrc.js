module.exports = {
  env: {
    es2021: true,
  },
  extends:
      'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'eslint-disable': 'off',
    'eslint-disable-line': 'off',
    'eslint-disable-next-line': 'off',
  },
};
