module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  env: () => ({}),
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-jest',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'), // force use postcss v8
        },
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
};
