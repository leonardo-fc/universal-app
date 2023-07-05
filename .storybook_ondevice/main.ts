const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  stories: [
    isTest
      ? '../src/components/*/*.stories.tsx' // exclude root stories, like App stories
      : '../src/components/**/*.stories.tsx',
  ],
  addons: [],
};
