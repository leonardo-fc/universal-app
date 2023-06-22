import { readFile, writeFile, rm } from 'fs/promises';

Promise.all([
  /* // webpack v4 throws an error on node v18, so force @storybook/react-native-server to use webpack v5
  replace({
    path: './node_modules/@storybook/react-native-server/dist/server/options.js',
    oldLine: '@storybook/manager-webpack4',
    newline: '@storybook/manager-webpack5',
  }), */

  /* // @storybook/addon-storyshots uses global.__STORYBOOK_STORY_STORE__.initializationPromise
  replace({
    path: './node_modules/@storybook/react-native/dist/index.js',
    oldLine: `const { clientApi, configure, view } = start();
export { configure };`,
    newline: `const { clientApi, configure, view } = start();
global.__STORYBOOK_STORY_STORE__ = { initializationPromise: clientApi.storyStore?.initializationPromise };
export { configure };`,
  }), */

  // Force @storybook/addon-storyshots v6 to use react-test-renderer v18
  rm(
    './node_modules/@storybook/addon-storyshots/node_modules/react-test-renderer',
    { recursive: true },
  ).catch(() => void 0),

  // Makes nativewind v2 update the dark mode on `setColorScheme` or `toggleColorScheme` calls
  // not only on startup
  replace({
    path: './node_modules/nativewind/dist/style-sheet/color-scheme.js',
    oldLine: `this.subscribeColorScheme(() => {
                    localStorage.theme = this.colorScheme;
                });`,
    newline: `
      this.subscribeColorScheme(() => {
        localStorage.theme = this.colorScheme;
        if (this.colorScheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      });`,
  }),

  // @miblanchard/react-native-slider source maps are causing warnings in web compiling
  // source-map-loader fail to parse them
  replace({
    path: './node_modules/@miblanchard/react-native-slider/lib/index.js',
    oldLine: '//# sourceMappingURL=index.js.map',
    newline: '',
  }),
  replace({
    path: './node_modules/@miblanchard/react-native-slider/lib/styles.js',
    oldLine: '//# sourceMappingURL=styles.js.map',
    newline: '',
  }),
]);

async function replace({
  path,
  oldLine,
  newline,
}: {
  path: string;
  oldLine: string;
  newline: string;
}) {
  const originalFile = await readFile(path, { encoding: 'utf8' });

  if (originalFile.includes(oldLine)) {
    const modifiedFile = originalFile.replace(oldLine, newline);

    await writeFile(path, modifiedFile);
  }
}
