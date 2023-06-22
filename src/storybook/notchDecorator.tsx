import { DecoratorFunction } from '@storybook/csf';
import { ReactNativeFramework } from '@storybook/react-native';
import { Background } from '~/components/shared/Themed';

const notchDecorator: DecoratorFunction<ReactNativeFramework> = (
  Story,
  { story },
) => {
  return (
    <Background className={`${story !== 'App' ? 'ios:pt-10' : ''} flex-1`}>
      <Story />
    </Background>
  );
};

export default notchDecorator;
