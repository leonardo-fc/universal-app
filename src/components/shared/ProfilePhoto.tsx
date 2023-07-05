import { Icon, TwStyle } from '../shared/Themed';
import { $profile } from '~/services/profile';
import { Image, View } from 'react-native';
import { useStore } from '@nanostores/react';

export function ProfilePhoto(
  p: Pick<typeof $profile, '$photo'> & {
    size: number;
    children?: React.ReactNode;
  } & TwStyle,
) {
  const photo = useStore(p.$photo);
  const iconMargin = p.size / 6;

  return (
    <View style={p.style} className='shadow'>
      {photo ? (
        <Image
          source={photo}
          style={{ height: p.size, width: p.size }}
          className='rounded-full'
        />
      ) : (
        <Icon
          name='account-circle-outline'
          style={{ margin: -iconMargin / 2 }}
          size={p.size + iconMargin}
        />
      )}
      {p.children}
    </View>
  );
}
