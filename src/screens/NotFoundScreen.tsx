import { TouchableOpacity } from 'react-native';

import { Text, Background } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<'NotFound'>) {
  return (
    <Background className='p-5 center'>
      <Text className='text-xl font-bold'>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        className='mt-4 py-4'>
        <Text className='text-[#2e78b7]'>Go to home screen!</Text>
      </TouchableOpacity>
    </Background>
  );
}
