import { ExpoConfig, ConfigContext } from 'expo/config';

const isStory = process.env.STORY_MODE === 'true';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  entryPoint: isStory ? './.storybook' : './src/App',
  name: 'universal-app',
  slug: 'universal-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',
  scheme: 'demo',
  userInterfaceStyle: 'automatic',
  jsEngine: 'hermes',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './src/assets/images/favicon.png',
  },
});
