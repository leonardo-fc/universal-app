import { View } from 'react-native';
import { playlist, playback } from '~/services/songs';
import PlayBar from './PlayBar';
import SongsList from './SongsList';

export default function Home() {
  return (
    <View className='flex-1'>
      <SongsList playlist={playlist} $selected={playback.$selected} />
      <PlayBar $song={playback.$song} />
    </View>
  );
}
