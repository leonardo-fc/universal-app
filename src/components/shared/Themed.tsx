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
  TextInput as DefaultTextInput,
  TextInputProps,
  Button as DefaultButton,
  ButtonProps,
  Switch as DefaultSwitch,
  SwitchProps,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import { Slider as DefaultSlider } from '@miblanchard/react-native-slider';
import { Link as DefaultLink, useLinkTo } from '@react-navigation/native';
import { WritableAtom, ReadableAtom } from 'nanostores';
import { useStore } from '@nanostores/react';
import { useColorScheme } from 'nativewind';
import { useEffect, useRef } from 'react';
import { Observable } from '~/functions/observable';
import { SafeAreaView } from 'react-native-safe-area-context';
import Device from '~/constants/Device';

export type TwStyle = {
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function withSafeArea(Component: () => JSX.Element) {
  const SafeArea = () => (
    <SafeAreaView className='flex-1'>
      <Component />
    </SafeAreaView>
  );
  return SafeArea;
}

export function Background(props: ViewProps) {
  return <View className='bg-[#fcfcfc] dark:bg-black' {...props} />;
}

export function SafeAreaBackground(props: ViewProps) {
  return (
    <SafeAreaView className='flex-1 bg-[#fcfcfc] dark:bg-black' {...props} />
  );
}

export function Card(props: ViewProps) {
  return <View className='bg-white shadow dark:bg-[#121212]' {...props} />;
}

export function Text(props: TextProps) {
  return (
    <DefaultText
      className='text-neutral-800 dark:text-neutral-100'
      {...props}
    />
  );
}

export function TextWithPlaceholder(
  props: {
    value: ReadableAtom<string>;
    placeholder?: string;
  } & Omit<TextProps, 'children'>,
) {
  const value = useStore(props.value);

  return (
    <Text className={value ? '' : 'opacity-[0.275]'} {...props}>
      {value || (props.placeholder ?? '')}
    </Text>
  );
}

/**
 * @default maxLength={300}
 */
export function TextInput(
  props: {
    value: WritableAtom<string>;
  } & Omit<TextInputProps, 'value' | 'onChangeText'>,
) {
  const { colorScheme } = useColorScheme();
  const value = useStore(props.value);

  return (
    <DefaultTextInput
      maxLength={300}
      className='text-neutral-900 dark:text-neutral-100'
      placeholderTextColor={
        // override because `multiline` mode breaks dark mode placeholder text color
        colorScheme === 'dark' ? 'rgba(255,255,255,0.275)' : 'rgba(0,0,0,0.275)'
      }
      {...props}
      value={value}
      onChangeText={props.value.set}
    />
  );
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

export type IconsName = keyof (typeof MaterialCommunityIcon)['glyphMap'];

// className is only working in wrappers of icon (tested in nativewind v2)
export function BaseIcon(props: IconProps<IconsName>) {
  return <MaterialCommunityIcon size={24} {...props} />;
}

export function Icon(props: IconProps<IconsName>) {
  return (
    <BaseIcon className='text-neutral-800 dark:text-neutral-200' {...props} />
  );
}

export function ClearIconButton({
  onPress,
  style,
  iconClassName,
  ...props
}: IconProps<IconsName> & { iconClassName?: string }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='items-center justify-center rounded-full p-3'
      style={style}>
      <Icon className={iconClassName} {...props} />
    </TouchableOpacity>
  );
}

export function IconButton(
  props: React.ComponentProps<typeof ClearIconButton>,
) {
  return (
    <ClearIconButton
      className='bg-neutral-100 dark:bg-neutral-900'
      {...props}
    />
  );
}

export function IconButtonWithText({
  title,
  style,
  ...props
}: React.ComponentProps<typeof IconButton> & {
  title: string;
}) {
  return (
    <View className='items-center gap-2' style={style}>
      <IconButton {...props} />
      <Text>{title}</Text>
    </View>
  );
}

export function Switch({
  $value,
  ...props
}: {
  $value: WritableAtom<boolean>;
} & Omit<SwitchProps, 'value' | 'onValueChange'>) {
  const value = useStore($value);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <DefaultSwitch
      thumbColor={Device.android ? 'rgb(34, 197, 94)' : undefined}
      trackColor={
        Device.android
          ? {
              false: isDark ? 'rgb(48, 48, 48)' : 'rgb(220, 220, 220)',
              true: isDark ? 'rgb(22, 101, 52)' : 'rgb(134 239 172)',
            }
          : undefined
      }
      className='text-green-300'
      {...props}
      value={value}
      onValueChange={$value.set}
    />
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
      thumbStyle={{ width: 0 }}
      minimumTrackTintColor='rgb(34 197 94)'
      maximumTrackTintColor='rgba(64, 64, 64, 0.5)'
      containerStyle={style}
      {...props}
    />
  );
}

function getSliderValue(v: number | number[]) {
  return Array.isArray(v) ? v[0] ?? 0 : v;
}

export function Link(
  props: ViewProps & {
    to: React.ComponentProps<typeof DefaultLink>['to'];
  },
) {
  const linkTo = useLinkTo();

  return <TouchableOpacity onPress={() => linkTo(props.to)} {...props} />;
}

export function Redirect(
  props: ViewProps & {
    to: React.ComponentProps<typeof DefaultLink>['to'];
  },
) {
  const linkTo = useLinkTo();

  useEffect(() => {
    linkTo(props.to);
  }, [linkTo, props.to]);

  return null;
}
