Node.js can be updated to version 18 when @expo/webpack-config is updated to ^18.0.0

[Expo router](https://expo.github.io/router/docs) can be used instead of React navigation when [css support for metro web](https://github.com/expo/router/pull/223) is added

After upgrading to Expo 48, remove `"jsEngine": "hermes"` from `app.config.ts`
