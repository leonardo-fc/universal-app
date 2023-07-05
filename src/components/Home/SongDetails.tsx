import { View } from 'react-native';
import { Song } from '~/services/songs';
import { Text, Icon } from '../shared/Themed';

export default function SongDetailsScreen(p: { song: Song }) {
  return (
    <View className='flex-1'>
      <Icon name='music' className='mr-2' />

      <Text numberOfLines={2} className='flex-shrink'>
        <Text className='font-bold'>{p.song.songName}</Text>
        {' - '}
        {p.song.authorName}
      </Text>
    </View>
  );
}
