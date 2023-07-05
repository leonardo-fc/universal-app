import initStoryshots from '@storybook/addon-storyshots';
import renderer from './shared/renderer';

// @storybook/react-native uses async-storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
jest.mock('react-native-reanimated', () => ({
  ...require('react-native-reanimated/mock'),
  makeMutable: jest.fn(),
  useWorkletCallback: (fn: unknown) => fn,
  runOnUI: (fn: unknown) => fn,
}));

initStoryshots({
  configPath: '.storybook_ondevice',
  renderer,
});
