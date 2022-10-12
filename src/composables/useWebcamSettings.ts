import { useDevicesList } from '@vueuse/core';
import { computed } from 'vue';
import { Notify } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useWebcamSettingsStore } from 'stores/settings/webCam.store';

export const useWebcamSettings = () => {
  const i18n = useI18n();
  const {
    defineCamera,
    camera,
  } = useWebcamSettingsStore();

  const selectCamera = (device: { label: string; value: string; } | null) => {
    if (!device) {
      Notify.create({
        type: 'negative',
        message: i18n.t('camera.noDeviceId') as string,
      });
    }
    defineCamera(device);
  };

  const { videoInputs } = useDevicesList({
    requestPermissions: true,
  });

  const availableCameras = computed(() => videoInputs.value.map((input) => ({
    label: input.label,
    value: input.deviceId,
  })));

  const defineDefaultCamera = () => {
    if (!camera) {
      selectCamera(availableCameras.value[0]);
    }
  };

  return {
    videoInputs,
    selectCamera,
    defineDefaultCamera,
    availableCameras,
  };
};
