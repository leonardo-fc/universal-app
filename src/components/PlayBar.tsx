import { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Audio, AVPlaybackSource, AVPlaybackStatus } from 'expo-av';
import { Background, IconButton, Text, Slider } from '~/components/Themed';
import { lightFormat } from 'date-fns';

type Song = {
  source: AVPlaybackSource;
  songName: string;
  authorName: string;
};

export default function PlayBar({ song }: { song?: Song }) {
  const sound = useSound(song?.source);

  if (!song || !sound.isLoaded) return null;

  return (
    <DumbPlayBar
      songName={song.songName}
      authorName={song.authorName}
      {...sound}
    />
  );
}

function useSound(source?: AVPlaybackSource) {
  const [sound, setSound] = useState<Audio.Sound>();
  const [status, setStatus] = useState<AVPlaybackStatus>({ isLoaded: false });
  const [slidingPosition, setSlidingPosition] = useState(0);
  const wasPlaying = useRef(false);
  const isSliding = useRef(false);

  // better than `status.didJustFinish`
  // because if you set position to the end but `shouldPlay` is false, `didJustFinish` remains false
  const isFinish =
    status.isLoaded && status.positionMillis === status.durationMillis;

  async function onPlay() {
    if (sound && status.isLoaded) {
      if (isFinish) {
        await sound.replayAsync();
      } else if (status.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  }

  useEffect(() => {
    if (!source) return;

    (async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
      }).catch(() => void 0);

      const { sound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: true },
        setStatus,
      );
      setSound(sound);
    })();
  }, [source]);

  useEffect(() => {
    if (sound) {
      return () => {
        sound.unloadAsync();
      };
    }
  }, [sound]);

  if (!sound || !status.isLoaded) {
    return { isLoaded: false, onPlay } as const;
  }

  const onSlidingStart = () => {
    isSliding.current = true;
    wasPlaying.current = status.isPlaying;

    if (wasPlaying.current) sound.pauseAsync();
  };

  const onSlidingComplete = () => {
    isSliding.current = false;

    if (wasPlaying.current) {
      sound.playFromPositionAsync(slidingPosition);
    } else {
      sound.setPositionAsync(slidingPosition);
    }
  };

  const positionToDisplay = isSliding.current
    ? slidingPosition
    : status.positionMillis;

  return {
    isLoaded: true,
    isPlaying: status.isPlaying,
    isFinish,
    position: positionToDisplay,
    duration: Number.isNaN(status.durationMillis) ? 0 : status.durationMillis, // initially returns NaN on web
    onPlay,
    onSlidingStart,
    onSlidingComplete,
    onPositionChange: setSlidingPosition,
  } as const;
}

export function DumbPlayBar(p: {
  songName: string;
  authorName: string;
  isPlaying?: boolean;
  isFinish?: boolean;
  position: number;
  duration: number | undefined;
  onPlay?: () => void;
  onSlidingStart?: () => void;
  onSlidingComplete?: () => void;
  onPositionChange?: (ms: number) => void;
  bottomPad?: boolean;
}) {
  const {
    songName,
    authorName,
    isPlaying,
    isFinish,
    position,
    duration,
    onPlay,
    onSlidingStart,
    onSlidingComplete,
    onPositionChange,
    bottomPad,
  } = p;

  const bottomPadClass = bottomPad ? 'ios:pb-6' : '';
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
          <IconButton
            name={isFinish ? 'replay' : isPlaying ? 'pause' : 'play'}
            onPress={onPlay}
            className='ml-2'
          />
        </View>
      </View>

      <Slider
        value={position}
        maximumValue={duration || 1}
        onValueChange={(v) => onPositionChange?.(getSliderValue(v))}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        thumbStyle={{ width: 0 }}
        thumbTintColor='#2196f3'
        minimumTrackTintColor='#2196f3'
        maximumTrackTintColor='rgba(64,64,64,0.5)'
        className='mr-3 grow'
      />
    </Background>
  );
}

function formatSoundTime(position: number, duration = 0) {
  const format = (n: number) => lightFormat(n, 'm:ss');

  return `${format(position)} / ${format(duration)}`;
}

function getSliderValue(v: number | number[]) {
  return Array.isArray(v) ? v[0] ?? 0 : v;
}
