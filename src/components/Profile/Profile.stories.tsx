/* eslint-disable @typescript-eslint/no-var-requires */
import { ComponentMeta } from '@storybook/react-native';
import { atom } from 'nanostores';
import { ComponentProps } from 'react';
import { withLightTheme, withDarkTheme } from '~/storybook/themes';
import Profile, { DumbProfile } from './Profile';

export default {
  title: `components/${Profile.name}`,
  component: Profile,
} as ComponentMeta<typeof Profile>;

const base = {
  $name: atom(''),
  $photo: atom(),
} satisfies Partial<ComponentProps<typeof DumbProfile>>;

const NameEmpty = () => <DumbProfile {...base} $name={atom('')} />;
export const NameEmptyLight = withLightTheme(NameEmpty);
export const NameEmptyDark = withDarkTheme(NameEmpty);

const NameShort = () => <DumbProfile {...base} $name={atom('L')} />;
export const NameShortLight = withLightTheme(NameShort);
export const NameShortDark = withDarkTheme(NameShort);

const NameLong = () => (
  <DumbProfile
    {...base}
    $name={atom('Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr.')}
  />
);
export const NameLongLight = withLightTheme(NameLong);
export const NameLongDark = withDarkTheme(NameLong);

const Photo = () => (
  <DumbProfile
    {...base}
    $name={atom('Smudge the Cat')}
    $photo={atom(require('~/assets/images/cat.jpeg'))}
  />
);
export const PhotoLight = withLightTheme(Photo);
export const PhotoDark = withDarkTheme(Photo);
