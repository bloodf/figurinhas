<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" @show="defineDefaultCamera">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">{{ $t('camera.switch.title') }}</div>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="tmpCamera"
          map-options
          :options="availableCameras"
          :label="$t('camera.switch.message')"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="$t('dialog.ok')" @click="onOKClick"/>
        <q-btn flat :label="$t('dialog.cancel')" @click="onCancelClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { useWebcamSettings } from 'src/composables/useWebcamSettings';
import { ref } from 'vue';
import { useWebcamSettingsStore } from 'stores/settings/webCam.store';

defineEmits([...useDialogPluginComponent.emits]);

const {
  availableCameras,
  selectCamera,
  defineDefaultCamera,
} = useWebcamSettings();

const {
  camera,
} = useWebcamSettingsStore();

const {
  dialogRef,
  onDialogHide,
  onDialogOK,
  onDialogCancel,
} = useDialogPluginComponent();

const tmpCamera = ref(camera);

const onOKClick = () => {
  selectCamera(tmpCamera.value);
  onDialogOK();
};

const onCancelClick = () => {
  onDialogCancel();
};
</script>
