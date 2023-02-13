import { LightTheme, DarkTheme } from '~/../.storybook/themes';
import TabOneScreen from './TabOneScreen';

export default {
  title: TabOneScreen.name,
  component: TabOneScreen,
};

export const DefaultLight = () => (
  <LightTheme>
    <TabOneScreen />
  </LightTheme>
);

export const DefaultDark = () => (
  <DarkTheme>
    <TabOneScreen />
  </DarkTheme>
);
