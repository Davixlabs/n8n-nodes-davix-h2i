const { configs } = require('@n8n/eslint-plugin-community-nodes');

module.exports = [
  {
    ignores: ['dist/**'],
  },
  configs.recommended,
];
