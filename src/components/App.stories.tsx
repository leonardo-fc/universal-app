import { ComponentMeta } from '@storybook/react-native';
import { withDarkTheme, withLightTheme } from '~/storybook/themes';
import App from './App';

export default {
  title: `${App.name}`,
  component: App,
} as ComponentMeta<typeof App>;

export const AppLight = withLightTheme(App);
export const AppDark = withDarkTheme(App);
