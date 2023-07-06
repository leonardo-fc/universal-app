import { atom, computed, onSet, ReadableAtom } from 'nanostores';
import { Audio, AVPlaybackSource } from 'expo-av';

export type Song = {
  id: string;
  source: AVPlaybackSource;
  songName: string;
  authorName: string;
};

// cspell:ignore Magaña Ahjay Stelino
export const playlist: Song[] = [
  {
    id: '1',
    source: require('~/assets/sounds/valley-sunset.mp3'),
    songName: 'Valley Sunset',
    authorName: 'Alejandro Magaña (A. M.)',
  },
  {
    id: '2',
    source: require('~/assets/sounds/tech-house-vibes.mp3'),
    songName: 'Tech House Vibes',
    authorName: 'Alejandro Magaña (A. M.)',
  },
  {
    id: '3',
    source: require('~/assets/sounds/sleepy-cat.mp3'),
    songName: 'Sleepy Cat',
    authorName: 'Alejandro Magaña (A. M.)',
  },
  {
    id: '4',
    source: require('~/assets/sounds/getting-ready.mp3'),
    songName: 'Getting Ready',
    authorName: 'Ahjay Stelino',
  },
  {
    id: '5',
    source: require('~/assets/sounds/deep-meditation.mp3'),
    songName: 'Deep Meditation',
    authorName: 'Alejandro Magaña (A. M.)',
  },
  {
    id: '6',
    source: require('~/assets/sounds/sports-highlights.mp3'),
    songName: 'Sports Highlights',
    authorName: 'Ahjay Stelino',
  },
  {
    id: '7',
    source: require('~/assets/sounds/uplift-me.mp3'),
    songName: 'Uplift Me',
    authorName: 'Ahjay Stelino',
  },
  {
    id: '8',
    source: require('~/assets/sounds/slow-trail.mp3'),
    songName: 'Slow Trail',
    authorName: 'Ahjay Stelino',
  },
];

export type SongPlaying = {
  songName: string;
  authorName: string;
  $status: ReadableAtom<'playing' | 'paused' | 'finished'>;
  $position: ReadableAtom<number>;
  $duration: ReadableAtom<number | undefined>;
  $loop: ReadableAtom<boolean>;
  toggleLoop: () => void;
  play: () => void;
  slide: (v: AsyncIterable<number>) => void;
};

Audio.setAudioModeAsync({
  staysActiveInBackground: true,
}).catch(() => void 0);

export type Playback = typeof playback;
export const playback = (() => {
  const $selected = atom<Song | undefined>();

  const $status = atom<'playing' | 'paused' | 'finished'>('paused');
  const $position = atom(0);
  const $duration = atom<number | undefined>(0);
  const $loop = atom(false);

  const createSound = () => {
    const sound = new Audio.Sound();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        const isFinish =
          status.durationMillis != null &&
          status.durationMillis - status.positionMillis < 500;

        $status.set(
          isFinish ? 'finished' : status.isPlaying ? 'playing' : 'paused',
        );
        $position.set(status.positionMillis);
        $duration.set(status.durationMillis);
        $loop.set(status.isLooping);
      }
    });
    return sound;
  };
  let sound = createSound();

  let isLoading = false; // `sound._loading` not enough
  onSet($selected, ({ abort }) => {
    if (isLoading) abort();
  });

  const $song = computed($selected, (song) => {
    if (!song) return;

    $status.set('paused');
    $position.set(0);
    $duration.set(0);

    const load = async () => {
      let timeout: NodeJS.Timeout | undefined;
      try {
        isLoading = true;
        if (sound._loaded) await sound.unloadAsync();
        // sound loading hangs sometimes
        timeout = setTimeout(async () => {
          sound = createSound();
          load();
        }, 500);

        await sound.loadAsync(song.source, { shouldPlay: true });
      } finally {
        if (timeout) clearTimeout(timeout);
        // to reduce loading hangs
        setTimeout(() => {
          isLoading = false;
        }, 500);
      }
    };
    load();

    return {
      songName: song.songName,
      authorName: song.authorName,
      $status,
      $position,
      $duration,
      $loop,
      toggleLoop() {
        sound.setIsLoopingAsync(!$loop.get());
      },
      play() {
        if (!sound._loaded) return;

        switch ($status.get()) {
          case 'playing':
            return sound.pauseAsync();

          case 'paused':
            return sound.playAsync();

          case 'finished':
            return sound.replayAsync();
        }
      },
      async slide(positions) {
        if (!sound._loaded) return;

        const wasPlaying = $status.get() === 'playing';

        if (wasPlaying) sound.pauseAsync();

        // for-await-for syntax not working on react native
        const _positions = positions[Symbol.asyncIterator]();
        while (true) {
          const { value: position, done } = await _positions.next();
          if (done) break;

          $position.set(position);
        }

        if (wasPlaying) {
          sound.playFromPositionAsync($position.get());
        } else {
          sound.setPositionAsync($position.get());
        }
      },
    } as SongPlaying;
  });

  return {
    $selected,
    $song,
  };
})();
