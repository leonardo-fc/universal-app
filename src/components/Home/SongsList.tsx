import { FlatList, Pressable } from 'react-native';
import { Background, Text } from '~/components/shared/Themed';

type Song = {
  source?: unknown;
  songName: string;
  authorName: string;
};

export default function SongsList(p: {
  playlist: Song[];
  onSelect: (index: number) => void;
}) {
  return (
    <Background className='flex-1'>
      <FlatList
        data={p.playlist}
        renderItem={({ item, index }) =>
          SongsItem(item, () => p.onSelect(index))
        }
      />
    </Background>
  );
}

function SongsItem(p: Song, onPress: () => void) {
  return (
    <Pressable onPress={onPress} className='row w-full p-4'>
      <Text className='flex-shrink' numberOfLines={2}>
        <Text className='font-bold'>{p.songName}</Text> - {p.authorName}
      </Text>
    </Pressable>
  );
}
