const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  stories: [`../src/${isTest ? '/components' : ''}**/*.stories.tsx`],
  addons: [],
};
