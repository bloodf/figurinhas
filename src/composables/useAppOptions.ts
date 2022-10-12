import { Dialog } from 'quasar';
import SelectCamera from 'components/settings/selectCamera.vue';

export const useAppOptions = () => {
  const switchWebCam = () => {
    Dialog.create({
      component: SelectCamera,
    });
  };

  return { switchWebCam };
};
