import { useStore } from '@nanostores/react';
import { computed, ReadableAtom } from 'nanostores';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const listeningMusic = require('~/assets/images/listeningMusic.webp');

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
      className='w-full flex-row items-center rounded px-4 py-3'>
      <SharedElement id={`item.${p.song.id}.song`}>
        <Image
          source={listeningMusic}
          style={{
            width: 32,
            height: 32,
          }}
          className='rounded'
        />
      </SharedElement>

      <Text numberOfLines={2} className={`ml-2 flex-shrink ${textColor}`}>
        <Text className={`font-bold ${textColor}`}>{p.song.songName}</Text>
        {' - '}
        {p.song.authorName}
      </Text>
    </TouchableOpacity>
  );
}
