import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';

import '~/nativewind';
import useCachedResources from '~/hooks/useCachedResources';
import Navigation from '~/navigation';

function App() {
  const isLoadingComplete = useCachedResources();
  const { colorScheme } = useColorScheme();

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

registerRootComponent(App);
