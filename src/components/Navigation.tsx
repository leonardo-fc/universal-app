/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { ColorSchemeName } from 'nativewind/dist/style-sheet/color-scheme';
import * as NavigationBar from 'expo-navigation-bar';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import NotFoundScreen from '~/components/NotFoundScreen';
import Home from '~/components/Home/Home';
import Profile from '~/components/Profile/Profile';
import {
  ProfileTabParamList,
  RootStackParamList,
  RootTabParamList,
} from '~/types';
import Device from '~/constants/Device';
import LinkingConfiguration from './Navigation.linking';
import { BaseIcon, IconsName, withSafeArea } from '~/components/shared/Themed';
import Settings from './Profile/Settings';
import EditProfile from './Profile/EditProfile';
import SongDetails from './Home/SongDetails';
import { createStackNavigator } from '@react-navigation/stack';

const LightTheme = (() => {
  const theme = { ...DefaultTheme };
  theme.colors.background = '#fcfcfc';
  return theme;
})();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

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
const RootStack = createSharedElementStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />

      <RootStack.Screen
        name='SongDetails'
        component={SongDetails}
        options={{
          /* presentation: 'modal', */
          title: 'Song',
          headerTransparent: true,
        }}
        sharedElements={(route) => {
          const { id } = route.params;
          return [`item.${id}.song`];
        }}
      />
    </RootStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'rgb(22, 163, 74)',
      }}>
      <BottomTab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: createTabBarIcon('home'),
        }}
      />
      <BottomTab.Screen
        name='ProfileTab'
        component={ProfileTab}
        options={{
          title: 'Profile',
          tabBarIcon: createTabBarIcon('account'),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileTabParamList>();

function ProfileTab() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='Profile'
        component={withSafeArea(Profile)}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name='EditProfile'
        component={EditProfile}
        options={{ headerTitle: 'Edit Profile' }}
      />
      <ProfileStack.Screen name='Settings' component={Settings} />
    </ProfileStack.Navigator>
  );
}

function createTabBarIcon(name: IconsName) {
  const TabBarIcon = ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => (
    <BaseIcon
      name={name}
      color={color}
      size={focused ? size + 2 : size}
      className='mb-[-3px]'
    />
  );
  return TabBarIcon;
}
