/* eslint-disable @typescript-eslint/no-var-requires */
import { ComponentMeta } from '@storybook/react-native';
import { atom } from 'nanostores';
import { ComponentProps } from 'react';
import { createModalStore } from '~/services/modal';
import { withLightTheme, withDarkTheme } from '~/storybook/themes';
import EditProfile, { DumbEditProfile } from './EditProfile';

export default {
  title: `components/${EditProfile.name}`,
  component: DumbEditProfile,
} as ComponentMeta<typeof DumbEditProfile>;

const base = {
  $name: atom(''),
  $photo: atom(),
  modal: createModalStore(),
} satisfies Partial<ComponentProps<typeof DumbEditProfile>>;

const NameEmpty = () => <DumbEditProfile {...base} $name={atom('')} />;
export const NameEmptyLight = withLightTheme(NameEmpty);
export const NameEmptyDark = withDarkTheme(NameEmpty);

const NameShort = () => <DumbEditProfile {...base} $name={atom('L')} />;
export const NameShortLight = withLightTheme(NameShort);
export const NameShortDark = withDarkTheme(NameShort);

const NameLong = () => (
  <DumbEditProfile
    {...base}
    $name={atom('Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr.')}
  />
);
export const NameLongLight = withLightTheme(NameLong);
export const NameLongDark = withDarkTheme(NameLong);

const Photo = () => (
  <DumbEditProfile
    {...base}
    $name={atom('Smudge the Cat')}
    $photo={atom(require('~/assets/images/cat.jpeg'))}
  />
);
export const PhotoLight = withLightTheme(Photo);
export const PhotoDark = withDarkTheme(Photo);

const Modal = () => (
  <DumbEditProfile {...base} modal={createModalStore(true)} />
);
export const ModalLight = withLightTheme(Modal);
export const ModalDark = withDarkTheme(Modal);
