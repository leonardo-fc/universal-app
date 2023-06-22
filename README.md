Music app demo.

# Setup

## Dev Container

If you use [VS Code](https://code.visualstudio.com/), you can install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.

Once installed you will be prompted to reopen the folder in a container. If you're not prompted, you can run the `Dev Containers: Open Folder in Container` command from the [VS Code Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).

Needs [Docker](https://www.docker.com/) installed.

## Alternative

- Install Node version 16.
- Install [pnpm](https://pnpm.io/installation).
- Run `pnpm install`.
- (To run the Desktop app) Follow [Tauri setup](https://tauri.app/v1/guides/getting-started/prerequisites).

# Run

## Mobile

Start Expo in the terminal, open the `Expo Go` ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent), [iOS](https://apps.apple.com/app/expo-go/id982107779)) app on your phone and scan the QR code that appeared in the terminal.

```sh
pnpm start
```

## Web

Start the web server and open in your browser the link that appeared in the terminal.

```sh
pnpm start:web
```

## Desktop

This opens the app window.

```sh
pnpm start:desktop
```

## Storybook

Start the storybook dashboard and the app.

```sh
pnpm story start
# or
pnpm story start:ios
# or
pnpm story start:web
```
