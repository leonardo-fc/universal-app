import { withLightTheme, withDarkTheme } from '~/../.storybook/themes';
import TabOneScreen from './TabOneScreen';

export default {
  title: `screens/${TabOneScreen.name}`,
  component: TabOneScreen,
};

export const DefaultLight = withLightTheme(TabOneScreen);
export const DefaultDark = withDarkTheme(TabOneScreen);
