module.exports = {
  stories: [
    process.env.NODE_ENV === 'test'
      ? '../src/components/*/*.stories.tsx' // exclude root stories, like App stories
      : '../src/components/**/*.stories.tsx',
  ],
  addons: [],
};
