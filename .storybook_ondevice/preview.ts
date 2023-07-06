import notchDecorator from '../src/storybook/notchDecorator';
import env from './env';

export const decorators = env.isTest ? [] : [notchDecorator];
export const parameters = {};
