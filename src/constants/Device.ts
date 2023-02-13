import { Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');

export default {
  ...window,
  isSmall: window.width < 375,
  OS: Platform.OS as 'ios' | 'android' | 'web',
};
