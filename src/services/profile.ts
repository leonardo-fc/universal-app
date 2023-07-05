import { atom } from 'nanostores';
import { ImageSourcePropType } from 'react-native';

export const $profile = {
  $name: atom('Your name'),
  $photo: atom<ImageSourcePropType | undefined>(),
} as const;
