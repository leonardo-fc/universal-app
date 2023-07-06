import { getStorybookUI } from '@storybook/react-native';
import env from './env';

import './storybook.requires';
import '../src/nativewind';

export default getStorybookUI({
  enableWebsockets: !env.isTest,
  onDeviceUI: false,
});
