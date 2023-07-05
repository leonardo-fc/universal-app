import { FlatList, TouchableOpacity } from 'react-native';
import { Background, Text } from '~/components/shared/Themed';
import { Playback, Song } from '~/services/songs';

export default function SongsList(p: {
  playlist: Song[];
  $selected: Playback['$selected'];
}) {
  return (
    <Background className='flex-1'>
      <FlatList
        data={p.playlist}
        renderItem={({ item }) => (
          <SongsItem song={item} onPress={() => p.$selected.set(item)} />
        )}
      />
    </Background>
  );
}

function SongsItem(p: { song: Song; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={p.onPress}
      className='w-full flex-row items-center rounded p-4'>
      <Text numberOfLines={2} className={`flex-shrink`}>
        <Text className={`font-bold`}>{p.song.songName}</Text>
        {' - '}
        {p.song.authorName}
      </Text>
    </TouchableOpacity>
  );
}
