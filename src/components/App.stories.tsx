import { ComponentMeta } from '@storybook/react-native';
import App from './App';

export default {
  title: `${App.name}`,
  component: App,
} as ComponentMeta<typeof App>;

export { default as App } from './App';
