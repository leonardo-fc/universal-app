/* eslint-disable no-restricted-imports */
/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  View,
  ViewProps,
  Text as DefaultText,
  TextProps,
  Button as DefaultButton,
  ButtonProps,
} from 'react-native';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

export function Background(props: ViewProps) {
  return <View className='bg-white dark:bg-black' {...props} />;
}

export function Text(props: TextProps) {
  return <DefaultText className='text-black dark:text-white' {...props} />;
}

export function Button({
  style,
  ...props
}: ButtonProps & Pick<ViewProps, 'style' | 'className'>) {
  return (
    <View style={style}>
      <DefaultButton {...props} />
    </View>
  );
}

type MaterialCommunityIcons = keyof (typeof MaterialCommunityIcon)['glyphMap'];

export function Icon(props: IconProps<MaterialCommunityIcons>) {
  return <_Icon className='text-2xl dark:text-white' {...props} />;
}

// className is only working in wrappers of icon (tested in nativewind v2)
function _Icon(props: IconProps<MaterialCommunityIcons>) {
  return <MaterialCommunityIcon {...props} />;
}
