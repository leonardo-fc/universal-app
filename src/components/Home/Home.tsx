import { AVPlaybackSource } from 'expo-av';
import { useState } from 'react';
import { View } from 'react-native';
import PlayBar from './PlayBar';
import SongsList from './SongsList';

// cspell:ignore Magaña Ahjay Stelino
const playlist: {
  source: AVPlaybackSource;
  songName: string;
  authorName: string;
}[] = [
  {
    source: require('~/assets/sounds/valley-sunset.mp3'),
    songName: 'Valley Sunset',
    authorName: 'Alejandro Magaña (A. M.)',
  },
  {
    source: require('~/assets/sounds/tech-house-vibes.mp3'),
    songName: 'Tech House Vibes',
    authorName: 'Alejandro Magaña (A. M.)',
  },
  {
    source: require('~/assets/sounds/sleepy-cat.mp3'),
    songName: 'Sleepy Cat',
    authorName: 'Alejandro Magaña (A. M.)',
  },
  {
    source: require('~/assets/sounds/getting-ready.mp3'),
    songName: 'Getting Ready',
    authorName: 'Ahjay Stelino',
  },
  {
    source: require('~/assets/sounds/deep-meditation.mp3'),
    songName: 'Deep Meditation',
    authorName: 'Alejandro Magaña (A. M.)',
  },
  {
    source: require('~/assets/sounds/sports-highlights.mp3'),
    songName: 'Sports Highlights',
    authorName: 'Ahjay Stelino',
  },
  {
    source: require('~/assets/sounds/uplift-me.mp3'),
    songName: 'Uplift Me',
    authorName: 'Ahjay Stelino',
  },
  {
    source: require('~/assets/sounds/slow-trail.mp3'),
    songName: 'Slow Trail',
    authorName: 'Ahjay Stelino',
  },
];

export default function Home() {
  const [selected, setSelected] = useState<number | undefined>();

  return (
    <View className='flex-1'>
      <SongsList playlist={playlist} onSelect={setSelected} />
      <PlayBar song={selected != null ? playlist[selected] : undefined} />
    </View>
  );
}
