import { atom, WritableAtom } from 'nanostores';
import { View } from 'react-native';
import { Text, Switch, TwStyle } from '../shared/Themed';

const $config = {
  $normalizeVolume: atom(true),
  $monoAudio: atom(false),
};

export default function Settings() {
  return (
    <View className='py-6'>
      <View className='mb-6 self-center rounded bg-neutral-300 px-6 py-3 dark:bg-neutral-800'>
        <Text>Mock settings</Text>
      </View>

      <Config
        title='Normalize volume'
        description='Set the same volume level for all tracks'
        $checked={$config.$normalizeVolume}
      />
      <Config
        title='Mono audio'
        description='Makes the left and right speakers play the same audio'
        $checked={$config.$monoAudio}
      />
    </View>
  );
}

function Config(
  p: {
    title: string;
    description: string;
    $checked: WritableAtom<boolean>;
  } & TwStyle,
) {
  return (
    <View
      style={p.style}
      className='w-screen flex-row items-center justify-between px-6 py-3'>
      <View className='flex-1 gap-1'>
        <Text>{p.title}</Text>
        <Text className='shrink text-neutral-600 dark:text-neutral-300'>
          {p.description}
        </Text>
      </View>
      <Switch $value={p.$checked} />
    </View>
  );
}
