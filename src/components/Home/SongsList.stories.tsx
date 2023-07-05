import { ComponentMeta } from '@storybook/react-native';
import { atom } from 'nanostores';
import { Song } from '~/services/songs';
import { withLightTheme, withDarkTheme } from '~/storybook/themes';
import SongsList from './SongsList';

export default {
  title: `components/${SongsList.name}`,
  component: SongsList,
} as ComponentMeta<typeof SongsList>;

const Empty = () => <SongsList playlist={[]} $selected={atom()} />;
export const EmptyLight = withLightTheme(Empty);
export const EmptyDark = withDarkTheme(Empty);

const somePlaylist: Song[] = [
  {
    id: '1',
    source: 1,
    songName: 'DOTAB', // cspell:disable-line
    authorName: 'Bear Ghost',
  },
  {
    id: '2',
    source: 1,
    songName: 'Nobody Likes The Opening Band',
    authorName: 'I DONT KNOW HOW BUT THEY FOUND ME', // cspell:disable-line
  },
];

const Some = () => <SongsList playlist={somePlaylist} $selected={atom()} />;
export const SomeLight = withLightTheme(Some);
export const SomeDark = withDarkTheme(Some);

const Selected = () => (
  <SongsList playlist={somePlaylist} $selected={atom(somePlaylist[1])} />
);
export const SelectedLight = withLightTheme(Selected);
export const SelectedDark = withDarkTheme(Selected);
