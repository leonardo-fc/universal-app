import { DecoratorFunction } from '@storybook/csf';
import { ReactNativeFramework } from '@storybook/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaBackground } from '~/components/shared/Themed';

const notchDecorator: DecoratorFunction<ReactNativeFramework> = (
  Story,
  { story },
) => {
  return story.startsWith('App ') ? (
    <Story />
  ) : (
    <SafeAreaProvider>
      <SafeAreaBackground>
        <Story />
      </SafeAreaBackground>
    </SafeAreaProvider>
  );
};

export default notchDecorator;
