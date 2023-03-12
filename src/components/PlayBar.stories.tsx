import { withLightTheme, withDarkTheme } from '~/../.storybook/themes';
import { minute, second } from '~/constants/time';
import PlayBar, { DumbPlayBar } from './PlayBar';

export default {
  title: `components/${PlayBar.name}`,
  component: PlayBar,
};

const ShortName = () => (
  <DumbPlayBar
    songName='DOTAB' // cspell:disable-line
    authorName='Bear Ghost'
    position={0}
    duration={undefined}
    bottomPad
  />
);
export const ShortNameLight = withLightTheme(ShortName);
export const ShortNameDark = withDarkTheme(ShortName);

const LongName = () => (
  <DumbPlayBar
    songName='Nobody Likes The Opening Band'
    authorName='I DONT KNOW HOW BUT THEY FOUND ME' // cspell:disable-line
    position={0}
    duration={undefined}
    bottomPad
  />
);
export const LongNameLight = withLightTheme(LongName);
export const LongNameDark = withDarkTheme(LongName);

const Playing = () => (
  <DumbPlayBar
    isPlaying
    songName='Creep'
    authorName='Radiohead' // cspell:disable-line
    position={57 * second}
    duration={3 * minute + 58 * second}
    bottomPad
  />
);
export const PlayingLight = withLightTheme(Playing);
export const PlayingDark = withDarkTheme(Playing);

const Replay = () => (
  <DumbPlayBar
    isFinish
    songName='Creep'
    authorName='Radiohead' // cspell:disable-line
    position={3 * minute + 58 * second}
    duration={3 * minute + 58 * second}
    bottomPad
  />
);
export const ReplayLight = withLightTheme(Replay);
export const ReplayDark = withDarkTheme(Replay);
