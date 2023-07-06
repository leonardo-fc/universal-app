import { View } from 'react-native';
import {
  Card,
  ClearIconButton,
  Text,
  Slider,
  Link,
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
    <Card className={`${bottomPadClass} absolute bottom-0 w-full rounded-t-xl`}>
      <Link to={'/SongDetails'} className='px-4 pt-2'>
        <View className='-mb-2 flex-row items-center justify-between'>
          <Text className='flex-shrink' numberOfLines={2}>
            <Text className='font-bold'>{songName}</Text> - {authorName}
          </Text>

          <View className='flex-row items-center'>
            <Text className='w-24 text-right'>
              {formatSoundTime(position, duration)}
            </Text>
            <ClearIconButton name={iconName} onPress={play} className='ml-2' />
          </View>
        </View>

        <Slider
          value={position}
          maximumValue={duration || 1}
          onSliding={slide}
        />
      </Link>
    </Card>
  );
}

function formatSoundTime(position: number | undefined, duration = 0) {
  if (position == null) return '';

  const format = (n: number) => lightFormat(n, 'm:ss');

  return `${format(position)} / ${format(duration)}`;
}
