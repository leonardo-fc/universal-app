/// <reference types="nativewind/types" />

import { NativeWindStyleSheet } from 'nativewind';

import '~/assets/css/importCss';

NativeWindStyleSheet.setOutput({
  web: 'css',
  default: 'native',
});
