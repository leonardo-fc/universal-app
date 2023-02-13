import { registerRootComponent } from 'expo';
import { getStorybookUI } from '@storybook/react-native';

import './storybook.requires';
import '~/nativewind';

const StorybookUIRoot = getStorybookUI({
  enableWebsockets: true,
  onDeviceUI: false,
});

registerRootComponent(StorybookUIRoot);
