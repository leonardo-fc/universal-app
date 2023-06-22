import concurrently from 'concurrently';
import chalk from 'chalk';

const args = process.argv.slice(2).join(' ');

if (!args) {
  console.error(
    chalk.red('Missing `start` script'),
    chalk.cyanBright('\nexample:') + ' pnpm story start, pnpm story start:web',
  );
  process.exit(1);
}

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
