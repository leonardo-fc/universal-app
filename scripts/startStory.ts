import concurrently from 'concurrently';

const args = process.argv.slice(2).join(' ');

concurrently(
  [
    {
      name: 'storybook',
      prefixColor: '#ff4785',
      command: 'pnpm exec storybook-server --quiet',
    },
    {
      name: 'expo',
      prefixColor: '#4630eb',
      command: `STORY_MODE=true pnpm run ${args}`,
    },
  ],
  {
    handleInput: true,
    defaultInputTarget: 'expo',
  },
);
