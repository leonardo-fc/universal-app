import { ComponentMeta } from '@storybook/react-native';
import { withLightTheme, withDarkTheme } from '~/storybook/themes';
import Settings from './Settings';

export default {
  title: `components/${Settings.name}`,
  component: Settings,
} as ComponentMeta<typeof Settings>;

const Default = () => <Settings />;
export const DefaultLight = withLightTheme(Default);
export const DefaultDark = withDarkTheme(Default);
