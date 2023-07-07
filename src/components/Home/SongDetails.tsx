import { useStore } from '@nanostores/react';
import { lightFormat } from 'date-fns';
import { Image, Share, View } from 'react-native';
import Device from '~/constants/Device';
import { playback, SongPlaying } from '~/services/songs';
import { Text, Redirect, Slider, ClearIconButton } from '../shared/Themed';
import { SharedElement } from 'react-navigation-shared-element';

export default function SongDetails() {
  const song = useStore(playback.$song);

  return song ? <DumbSongDetails {...song} /> : <Redirect to={'/Home'} />;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const listeningMusic = require('~/assets/images/listeningMusic.webp');

export function DumbSongDetails(p: SongPlaying) {
  const status = useStore(p.$status);
  const position = useStore(p.$position);
  const duration = useStore(p.$duration);
  const loop = useStore(p.$loop);

  const iconName = (
    {
      playing: 'pause',
      paused: 'play',
      finished: 'replay',
    } as const
  )[status];

  return (
    <View className='flex-1 px-6 pt-40'>
      <SharedElement id={`item.${p.songId}.song`}>
        <Image
          source={listeningMusic}
          style={{
            width: Device.width - 24 * 2,
            height: Device.width - 24 * 2,
          }}
          className='rounded-xl'
        />
      </SharedElement>

      <View className='mt-8 flex-row items-center justify-between'>
        <View className='flex-shrink gap-2'>
          <Text className='text-lg font-bold'>{p.songName}</Text>
          <Text>{p.authorName}</Text>
        </View>
      </View>

      <Slider
        value={position}
        maximumValue={duration || 1}
        onSliding={p.slide}
        className='mt-6'
      />

      <View className='flex-row items-center justify-between'>
        <Text>{formatTime(position)}</Text>
        <Text>{formatTime(duration)}</Text>
      </View>

      <View className='mt-4 flex-row items-center justify-between'>
        <ClearIconButton
          onPress={p.toggleLoop}
          name='sync'
          size={36}
          iconClassName={loop ? 'text-green-500' : ''}
        />
        <ClearIconButton
          onPress={p.play}
          name={iconName}
          size={44}
          className='bg-neutral-900 dark:bg-white'
          iconClassName='text-white dark:text-black'
        />
        <ClearIconButton
          onPress={() =>
            Share.share({
              title: `${p.songName} - ${p.authorName}`,
              // mock impl
              message: formatUrl(
                `https://music.com/song-details?song=${p.songName}-${p.authorName}`,
              ),
            })
          }
          name='share-variant'
          size={32}
        />
      </View>
    </View>
  );
}

function formatUrl(text: string) {
  return text.toLowerCase().replaceAll(' ', '-');
}

function formatTime(time = 0) {
  return lightFormat(time, 'm:ss');
}
