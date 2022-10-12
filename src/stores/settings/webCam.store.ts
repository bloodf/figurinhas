import { defineStore } from 'pinia';
import { LOCAL_CAMERA_KEY } from 'src/constants/localStorage';
import { useLocalStorage } from '@vueuse/core';

type CurrentCamera = { label: string; value: string; }
  | null;
export const useWebcamSettingsStore = defineStore('settings.webCam', {
  state: () => ({
    currentCamera: useLocalStorage<CurrentCamera>(LOCAL_CAMERA_KEY, null, {
      serializer: {
        read: (v: string) => (v ? JSON.parse(v) : null),
        write: (v: CurrentCamera) => JSON.stringify(v),
      },
    }),
  }),
  getters: {
    camera: (state): CurrentCamera => state.currentCamera,
  },
  actions: {
    defineCamera(device: CurrentCamera) {
      if (device) {
        this.currentCamera = device;
      }
    },
  },
});
