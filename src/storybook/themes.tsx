import { NativeWindStyleSheet } from 'nativewind';
import { useEffect } from 'react';

export function withDarkTheme(Component: () => React.ReactNode) {
  return function DarkThemeProvider() {
    useEffect(() => {
      NativeWindStyleSheet.setColorScheme('dark');
    }, []);

    return Component();
  };
}

export function withLightTheme(Component: () => React.ReactNode) {
  return function LightThemeProvider() {
    useEffect(() => {
      NativeWindStyleSheet.setColorScheme('light');
    }, []);

    return Component();
  };
}
