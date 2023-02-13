/* eslint-disable @typescript-eslint/no-var-requires */
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  if (!env?.mode)
    env = {
      projectRoot: __dirname,
      mode: 'development',
      pwa: false,
    };

  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['nativewind'],
      },
    },
    argv,
  );

  config.module.rules.push({
    test: /\.css$/i,
    use: ['postcss-loader'],
  });

  return config;
};
