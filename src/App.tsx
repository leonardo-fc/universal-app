import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { useColorScheme as defaultUseColorScheme } from 'react-native';

import '~/nativewind';
import useCachedResources from '~/hooks/useCachedResources';
import Navigation from '~/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const { colorScheme } = useColorScheme();
  // nativewind `useColorScheme` don't update on system color scheme change (tested in nativewind v2)
  // calling react-native `useColorScheme` fix it
  defaultUseColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}
