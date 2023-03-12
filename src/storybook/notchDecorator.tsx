import { DecoratorFunction } from '@storybook/csf';
import { ReactNativeFramework } from '@storybook/react-native';
import { Background } from '~/components/Themed';

const notchDecorator: DecoratorFunction<ReactNativeFramework> = (Story) => {
  return (
    <Background className='ios:pt-10 flex-1'>
      <Story />
    </Background>
  );
};

export default notchDecorator;
