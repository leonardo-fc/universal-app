import { ComponentMeta } from '@storybook/react-native';
import { withLightTheme, withDarkTheme } from '~/storybook/themes';
import SongsList from './SongsList';

export default {
  title: `components/${SongsList.name}`,
  component: SongsList,
} as ComponentMeta<typeof SongsList>;

const Empty = () => <SongsList playlist={[]} onSelect={() => void 0} />;
export const EmptyLight = withLightTheme(Empty);
export const EmptyDark = withDarkTheme(Empty);

const Some = () => (
  <SongsList
    playlist={[
      { songName: 'DOTAB', authorName: 'Bear Ghost' }, // cspell:disable-line
      {
        songName: 'Nobody Likes The Opening Band',
        authorName: 'I DONT KNOW HOW BUT THEY FOUND ME', // cspell:disable-line
      },
    ]}
    onSelect={() => void 0}
  />
);
export const SomeLight = withLightTheme(Some);
export const SomeDark = withDarkTheme(Some);
