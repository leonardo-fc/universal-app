import { View } from 'react-native';
import {
  Text,
  Background,
  Icon,
  IconsName,
  Link,
  TextWithPlaceholder,
  TwStyle,
} from '../shared/Themed';
import { $profile } from '~/services/profile';
import { ProfilePhoto } from '../shared/ProfilePhoto';

export default function Profile() {
  return <DumbProfile {...$profile} />;
}

export function DumbProfile(p: typeof $profile) {
  return (
    <Background className='flex-1 p-6'>
      <View className='mb-8 flex-row items-center gap-6 pl-6'>
        <ProfilePhoto $photo={p.$photo} size={96} />
        <TextWithPlaceholder
          value={p.$name}
          placeholder='Anonymous'
          className='flex-shrink text-xl font-bold'
        />
      </View>

      <View className='gap-3'>
        <ProfileButton icon='account' title='Edit Profile' to='/EditProfile' />
        <ProfileButton icon='cog' title='Settings' to='/Settings' />
        <ProfileButton icon='exit-to-app' title='Log out' to='/Home' />
      </View>
    </Background>
  );
}

function ProfileButton(
  p: {
    icon: IconsName;
    title: string;
    to: React.ComponentProps<typeof Link>['to'];
  } & TwStyle,
) {
  return (
    <Link
      to={p.to}
      style={p.style}
      className='flex-grow flex-row items-center rounded border-2 border-neutral-100 py-3 px-6 dark:border-neutral-900'>
      <Icon name={p.icon} className='mr-4 text-2xl' />
      <Text className='text-xl font-bold'>{p.title}</Text>
    </Link>
  );
}
