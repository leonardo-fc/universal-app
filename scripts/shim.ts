import { readFileSync, writeFileSync } from 'fs';

// Makes nativewind v2 update the dark mode on `setColorScheme` or `toggleColorScheme` calls
// not only on startup
{
  const path = './node_modules/nativewind/dist/style-sheet/color-scheme.js';

  const oldLines = `this.subscribeColorScheme(() => {
                    localStorage.theme = this.colorScheme;
                });`;
  const newlines = `
  this.subscribeColorScheme(() => {
    localStorage.theme = this.colorScheme;
    if (this.colorScheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  `;

  const originalFile = readFileSync(path, { encoding: 'utf8' });

  if (originalFile.includes(oldLines)) {
    const modifiedFile = originalFile.replace(oldLines, newlines);

    writeFileSync(path, modifiedFile);
  }
}
