import { getStorybookUI } from '@storybook/react-native';

import './storybook.requires';
import '../src/nativewind';

const isTest = process.env.NODE_ENV === 'test';

export default getStorybookUI({
  enableWebsockets: !isTest,
  onDeviceUI: false,
});
