import { Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');

export default {
  ...window,
  isSmall: window.width < 375,
  ios: Platform.OS === 'ios',
  android: Platform.OS === 'android',
  web: Platform.OS === 'web',
} as const;
