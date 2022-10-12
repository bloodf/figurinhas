<template>
    <q-btn @click="fetchAndDrawResult">Detect</q-btn>
    <LiveResult ref="liveResult">
      <CamView ref="camView"/>
    </LiveResult>
</template>

<script setup lang="ts">
import CamView from 'components/webCam/camView.vue';
import { detectImage } from 'src/composables/detectImage';
import { ref, watch } from 'vue';
import LiveResult from 'components/result/liveResult.vue';

const camView = ref();
const liveResult = ref();

const {
  detect,
  setVideoSource,
  setLiveResultSource,
  drawResult,
  result,
} = detectImage();

const fetchAndDrawResult = async () => {
  await detect();
  await drawResult();
};

watch([liveResult, camView], (n) => {
  setLiveResultSource(n[0].element);
  setVideoSource(n[1].element);
});
</script>
