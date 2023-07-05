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
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import { Slider as DefaultSlider } from '@miblanchard/react-native-slider';
import { useRef } from 'react';
import { Observable } from '~/functions/observable';

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

export function IconButton({
  onPress,
  style,
  iconClassName,
  ...props
}: IconProps<MaterialCommunityIcons> & { iconClassName?: string }) {
  return (
    <TouchableOpacity
      className='aspect-square min-h-[32px] min-w-[32px] items-center justify-center'
      style={style}
      onPress={onPress}>
      <Icon className={iconClassName} {...props} />
    </TouchableOpacity>
  );
}

type SliderDefaultProps = Partial<typeof DefaultSlider.defaultProps>;
type SliderProps = Omit<DefaultSlider['props'], keyof SliderDefaultProps> &
  Partial<Pick<DefaultSlider['props'], keyof SliderDefaultProps>>;

export function Slider({
  onSliding,
  style,
  ...props
}: Omit<
  SliderProps,
  'onSlidingStart' | 'onValueChange' | 'onSlidingComplete'
> & {
  onSliding: (v: AsyncIterable<number>) => void;
  className?: string;
  style?: ViewStyle;
}) {
  const observable = useRef<Observable<number>>();

  return (
    <DefaultSlider
      containerStyle={style}
      onSlidingStart={async () => {
        observable.current = new Observable();
        onSliding(observable.current);
      }}
      onValueChange={(v) => {
        observable.current?.next(getSliderValue(v));
      }}
      onSlidingComplete={(v) => {
        observable.current?.final(getSliderValue(v));
        observable.current = undefined;
      }}
      {...props}
    />
  );
}

function getSliderValue(v: number | number[]) {
  return Array.isArray(v) ? v[0] ?? 0 : v;
}
}
