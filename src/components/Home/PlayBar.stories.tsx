import { withLightTheme, withDarkTheme } from '~/storybook/themes';
import { minute, second } from '~/constants/time';
import PlayBar, { DumbPlayBar } from './PlayBar';
import { ComponentMeta } from '@storybook/react-native';
import { atom } from 'nanostores';
import { ComponentProps } from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: `components/${PlayBar.name}`,
  component: DumbPlayBar,
} as ComponentMeta<typeof DumbPlayBar>;

const base = {
  $status: atom('paused'),
  $position: atom(0),
  $duration: atom(0),
  play: action('play'),
  slide: action('slide'),
  bottomPad: true,
} satisfies Partial<ComponentProps<typeof DumbPlayBar>>;

const NameShort = () => (
  <DumbPlayBar
    {...base}
    songName='DOTAB' // cspell:disable-line
    authorName='Bear Ghost'
  />
);
export const NameShortLight = withLightTheme(NameShort);
export const NameShortDark = withDarkTheme(NameShort);

const NameLong = () => (
  <DumbPlayBar
    {...base}
    songName='Nobody Likes The Opening Band'
    authorName='I DONT KNOW HOW BUT THEY FOUND ME' // cspell:disable-line
  />
);
export const NameLongLight = withLightTheme(NameLong);
export const NameLongDark = withDarkTheme(NameLong);

const Playing = () => (
  <DumbPlayBar
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
  <DumbPlayBar
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
