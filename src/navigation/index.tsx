/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'nativewind';
import { ColorSchemeName } from 'nativewind/dist/style-sheet/color-scheme';
import * as NavigationBar from 'expo-navigation-bar';

import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Device from '~/constants/Device';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  useEffect(() => {
    if (Device.android)
      NavigationBar.setBackgroundColorAsync(theme.colors.card);
  }, [theme]);

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { colorScheme } = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='TabOne'
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#2f95dc',
      }}>
      <BottomTab.Screen
        name='TabOne'
        component={TabOneScreen}
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='TabTwo'
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
