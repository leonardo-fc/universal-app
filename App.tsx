/* eslint-disable @typescript-eslint/no-var-requires */
import Constants from 'expo-constants';

const isStoryMode = Constants.expoConfig?.extra?.storyMode === 'true';

export default isStoryMode
  ? require('./.storybook_ondevice').default
  : require('./src/components/App').default;
