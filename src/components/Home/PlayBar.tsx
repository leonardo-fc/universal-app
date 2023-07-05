import { View } from 'react-native';
import {
  Background,
  IconButton,
  Text,
  Slider,
} from '~/components/shared/Themed';
import { lightFormat } from 'date-fns';
import { useStore } from '@nanostores/react';
import { Playback, SongPlaying } from '~/services/songs';

export default function PlayBar(p: { $song: Playback['$song'] }) {
  const song = useStore(p.$song);

  if (!song) return null;

  return <DumbPlayBar {...song} />;
}

export function DumbPlayBar(
  p: SongPlaying & {
    slide: (v: AsyncIterable<number>) => void;
  bottomPad?: boolean;
  },
) {
  const {
    songName,
    authorName,
    $status,
    $position,
    $duration,
    play,
    slide,
    bottomPad,
  } = p;

  const status = useStore($status);
  const position = useStore($position);
  const duration = useStore($duration);

  const bottomPadClass = bottomPad ? 'ios:pb-6' : '';
  const iconName = (
    {
      playing: 'pause',
      paused: 'play',
      finished: 'replay',
    } as const
  )[status];

  return (
    <Background
      className={`absolute bottom-0 w-full bg-zinc-100 px-4 ${bottomPadClass} pt-3 dark:bg-zinc-900`}>
      <View className='flex-row items-center justify-between'>
        <Text className='flex-shrink' numberOfLines={2}>
          <Text className='font-bold'>{songName}</Text> - {authorName}
        </Text>

        <View className='flex-row items-center'>
          <Text className='w-24 text-right'>
            {formatSoundTime(position, duration)}
          </Text>
          <IconButton name={iconName} onPress={play} className='ml-2' />
        </View>
      </View>

      <Slider
        value={position}
        maximumValue={duration || 1}
        onSliding={slide}
        thumbStyle={{ width: 0 }}
        thumbTintColor='#2196f3'
        minimumTrackTintColor='#2196f3'
        maximumTrackTintColor='rgba(64,64,64,0.5)'
        className='mr-3 grow'
      />
    </Background>
  );
}

function formatSoundTime(position: number | undefined, duration = 0) {
  if (position == null) return '';

  const format = (n: number) => lightFormat(n, 'm:ss');

  return `${format(position)} / ${format(duration)}`;
}
