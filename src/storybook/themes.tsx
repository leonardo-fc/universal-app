import { NativeWindStyleSheet } from 'nativewind';
import { useEffect } from 'react';

export function withDarkTheme(Component: () => JSX.Element) {
  return function DarkThemeProvider() {
    useEffect(() => {
      NativeWindStyleSheet.setColorScheme('dark');
    }, []);

    return <Component />;
  };
}

export function withLightTheme(Component: () => JSX.Element) {
  return function LightThemeProvider() {
    useEffect(() => {
      NativeWindStyleSheet.setColorScheme('light');
    }, []);

    return <Component />;
  };
}
