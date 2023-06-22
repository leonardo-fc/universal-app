import { withTests } from '@storybook/addon-jest';

import results from '../tests/.results.json';

export const decorators = [withTests({ results })];
export const parameters = {};
