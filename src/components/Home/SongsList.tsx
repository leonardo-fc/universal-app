import { useStore } from '@nanostores/react';
import { computed, ReadableAtom } from 'nanostores';
import { FlatList, TouchableOpacity } from 'react-native';
import { Background, Icon, Text } from '~/components/shared/Themed';
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
          <SongsItem
            song={item}
            $isSelected={computed(
              p.$selected,
              (selected) => selected?.id === item.id,
            )}
            onPress={() => p.$selected.set(item)}
          />
        )}
      />
    </Background>
  );
}

function SongsItem(p: {
  song: Song;
  $isSelected: ReadableAtom<boolean>;
  onPress: () => void;
}) {
  const isSelected = useStore(p.$isSelected);
  const textColor = isSelected ? 'text-green-500' : '';

  return (
    <TouchableOpacity
      onPress={p.onPress}
      className='w-full flex-row items-center rounded p-4'>
      <Icon name='music' className={`mr-2 ${textColor}`} />

      <Text numberOfLines={2} className={`flex-shrink ${textColor}`}>
        <Text className={`font-bold ${textColor}`}>{p.song.songName}</Text>
        {' - '}
        {p.song.authorName}
      </Text>
    </TouchableOpacity>
  );
}
