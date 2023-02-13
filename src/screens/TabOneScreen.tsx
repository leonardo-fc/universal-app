import { useColorScheme } from 'nativewind';
import { Text, Background, Button, Icon } from '~/components/Themed';
import Device from '~/constants/Device';

export default function TabOneScreen() {
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

  const iconName = (() => {
    if (Device.OS === 'ios') return 'apple';
    return Device.OS;
  })();

  return (
    <Background className='center'>
      <Icon name={iconName} className='text-7xl' />
      <Text className='mt-4 text-lg font-bold'>Theme: {colorScheme}</Text>
      <Button className='mt-3' title='Toggle' onPress={toggleColorScheme} />
      <Button
        className='mt-1'
        title='Toggle to system'
        onPress={() => setColorScheme('system')}
      />
    </Background>
  );
}
