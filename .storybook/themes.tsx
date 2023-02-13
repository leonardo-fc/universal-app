import { NativeWindStyleSheet } from 'nativewind';
import { useEffect } from 'react';

export function DarkTheme({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    NativeWindStyleSheet.setColorScheme('dark');
  }, []);

  return <>{children}</>;
}

export function LightTheme({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    NativeWindStyleSheet.setColorScheme('light');
  }, []);

  return <>{children}</>;
}
