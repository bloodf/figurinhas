<template>
  <video ref="element" muted autoplay/>
</template>
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { useUserMedia } from '@vueuse/core';
import { useWebcamSettingsStore } from 'stores/settings/webCam.store';
import { storeToRefs } from 'pinia';

const element = ref();

defineExpose({ element });

const { camera } = storeToRefs(useWebcamSettingsStore());

const userMedia = useUserMedia({
  autoSwitch: true,
  enabled: true,
  audioDeviceId: false,
  videoDeviceId: camera?.value?.value,
});

watch(camera, (n) => {
  userMedia.videoDeviceId.value = n?.value;
});
watchEffect(() => {
  if (element.value) {
    element.value.srcObject = userMedia.stream.value!;
  }
});
</script>
