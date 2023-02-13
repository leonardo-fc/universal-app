module.exports = {
  stories: ['../src/**/*.stories.?(ts|tsx|js|jsx)'],
  env: () => ({}),
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-jest',
  ],
};
