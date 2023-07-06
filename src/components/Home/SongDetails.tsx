import { useStore } from '@nanostores/react';
import { lightFormat } from 'date-fns';
import { View } from 'react-native';
import Device from '~/constants/Device';
import { playback, SongPlaying } from '~/services/songs';
import {
  Text,
  Icon,
  Redirect,
  Slider,
  ClearIconButton,
} from '../shared/Themed';

export default function SongDetails() {
  const song = useStore(playback.$song);
  return song ? <DumbSongDetails {...song} /> : <Redirect to={'/Home'} />;
}

export function DumbSongDetails(p: SongPlaying) {
  const status = useStore(p.$status);
  const position = useStore(p.$position);
  const duration = useStore(p.$duration);

  const iconName = (
    {
      playing: 'pause',
      paused: 'play',
      finished: 'replay',
    } as const
  )[status];

  return (
    <View className='flex-1 p-6'>
      <View className='mt-20 aspect-square w-full items-center justify-center self-center rounded-xl bg-neutral-900 dark:bg-white'>
        <Icon
          name='music'
          size={Device.width * 0.7}
          className='text-white dark:text-black'
        />
      </View>

      <View className='mt-16 flex-row items-center justify-between'>
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

      <View className='mt-4 flex-row items-center justify-center'>
        <ClearIconButton
          onPress={p.play}
          name={iconName}
          size={48}
          className='bg-neutral-900 dark:bg-white'
          iconClassName='text-white dark:text-black'
        />
      </View>
    </View>
  );
}

function formatTime(time = 0) {
  return lightFormat(time, 'm:ss');
}
