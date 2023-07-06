import { withLightTheme, withDarkTheme } from '~/storybook/themes';
import { minute, second } from '~/constants/time';
import SongDetails, { DumbSongDetails } from './SongDetails';
import { ComponentMeta } from '@storybook/react-native';
import { atom } from 'nanostores';
import { ComponentProps } from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: `components/${SongDetails.name}`,
  component: DumbSongDetails,
} as ComponentMeta<typeof DumbSongDetails>;

const base = {
  $status: atom('paused'),
  $position: atom(0),
  $duration: atom(0),
  play: action('play'),
  slide: action('slide'),
} satisfies Partial<ComponentProps<typeof DumbSongDetails>>;

const NameShort = () => (
  <DumbSongDetails
    {...base}
    songName='DOTAB' // cspell:disable-line
    authorName='Bear Ghost'
  />
);
export const NameShortLight = withLightTheme(NameShort);
export const NameShortDark = withDarkTheme(NameShort);

const NameLong = () => (
  <DumbSongDetails
    {...base}
    songName='Nobody Likes The Opening Band'
    authorName='I DONT KNOW HOW BUT THEY FOUND ME' // cspell:disable-line
  />
);
export const NameLongLight = withLightTheme(NameLong);
export const NameLongDark = withDarkTheme(NameLong);

const Playing = () => (
  <DumbSongDetails
    {...base}
    songName='Creep'
    authorName='Radiohead' // cspell:disable-line
    $status={atom('playing')}
    $position={atom(57 * second)}
    $duration={atom(3 * minute + 58 * second)}
  />
);
export const PlayingLight = withLightTheme(Playing);
export const PlayingDark = withDarkTheme(Playing);

const Replay = () => (
  <DumbSongDetails
    {...base}
    songName='Creep'
    authorName='Radiohead' // cspell:disable-line
    $status={atom('finished')}
    $position={atom(3 * minute + 58 * second)}
    $duration={atom(3 * minute + 58 * second)}
  />
);
export const ReplayLight = withLightTheme(Replay);
export const ReplayDark = withDarkTheme(Replay);
