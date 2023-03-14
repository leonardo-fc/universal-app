/* eslint-disable @typescript-eslint/no-explicit-any */
import initStoryshots from '@storybook/addon-storyshots';
import renderer from './shared/renderer';

// @storybook/react-native uses async-storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

initStoryshots({
  configPath: '.storybook_ondevice',
  renderer,
});
