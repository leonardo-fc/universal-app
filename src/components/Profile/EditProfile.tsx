import {
  Background,
  TextInput,
  IconButton,
  IconButtonWithText,
} from '../shared/Themed';
import { $profile } from '~/services/profile';
import * as ImagePicker from 'expo-image-picker';
import { ProfilePhoto } from '../shared/ProfilePhoto';
import { View } from 'react-native';

import { useStore } from '@nanostores/react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { createModalStore, ModalStore } from '~/services/modal';

export default function EditProfile() {
  return <DumbEditProfile {...$profile} modal={createModalStore()} />;
}

type EditProfile = typeof $profile & {
  modal: ModalStore;
};
export function DumbEditProfile(p: EditProfile) {
  return (
    <>
      <Background className='flex-1 gap-6 p-6'>
        <ProfilePhoto $photo={p.$photo} size={170} className='self-center'>
          <IconButton
            name='camera'
            onPress={p.modal.open}
            className='absolute right-0 bottom-0 shadow'
          />
        </ProfilePhoto>

        <TextInput
          value={p.$name}
          placeholder='Your name'
          className='text-center text-xl font-bold'
        />
      </Background>
      <PhotoModal {...p} />
    </>
  );
}

function PhotoModal(p: EditProfile) {
  const { colorScheme } = useColorScheme();

  return (
    <BottomSheet
      enablePanDownToClose
      snapPoints={[130]}
      index={p.modal.get() ? 0 : -1}
      onClose={p.modal.close}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor:
          colorScheme === 'dark' ? 'rgb(18, 18, 18)' : 'rgb(255, 255, 255)',
      }}>
      <PhotoModalContent {...p} />
    </BottomSheet>
  );
}

function PhotoModalContent(p: EditProfile) {
  const showModal = useStore(p.modal);
  const bottomSheet = useBottomSheet();

  useEffect(() => {
    if (showModal) bottomSheet.snapToIndex(0);
    else bottomSheet.close();
  }, [bottomSheet, showModal]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      p.$photo.set(result.assets[0]);
    }
    p.modal.close();
  };
  const deleteImage = () => {
    p.$photo.set(undefined);
    p.modal.close();
  };

  return (
    <View className='flex-row gap-6 px-6'>
      <IconButtonWithText title='Gallery' name='image' onPress={pickImage} />
      <IconButtonWithText title='Remove' name='delete' onPress={deleteImage} />
    </View>
  );
}

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
);
