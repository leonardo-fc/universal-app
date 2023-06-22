import concurrently from 'concurrently';

concurrently(
  [
    { name: 'test', prefixColor: 'green', command: 'pnpm run test' },
    { name: 'type', prefixColor: 'blue', command: 'pnpm run type-check' },
    { name: 'spell', prefixColor: 'white', command: 'pnpm run spell-check' },
    { name: 'fmt', prefixColor: 'gray', command: 'pnpm run fmt-check' },
    { name: 'lint', prefixColor: 'yellow', command: 'pnpm run lint' },
  ],
  { group: true },
).result.catch(() => process.exit(1));
