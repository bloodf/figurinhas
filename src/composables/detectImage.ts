import { computed, ref } from 'vue';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import type { DetectedObject } from '@tensorflow-models/coco-ssd';
import { Notify } from 'quasar';
import { useI18n } from 'vue-i18n';

export const detectImage = () => {
  const i18n = useI18n();
  const result = ref<DetectedObject[]>([]);
  const resultDraws = ref<(HTMLDivElement | Element)[]>([]);
  const videoRef = ref<HTMLVideoElement>();
  const liveResultRef = ref<HTMLDivElement>();

  const setVideoSource = (video: HTMLVideoElement) => {
    videoRef.value = video;
  };

  const setLiveResultSource = (video: HTMLDivElement) => {
    liveResultRef.value = video;
  };

  async function detect(): Promise<DetectedObject[]> {
    if (videoRef.value) {
      const model = await cocoSsd.load();
      result.value = await model.detect(videoRef.value);
      return result.value;
    }
    return [];
  }

  async function drawResult() {
    if (!liveResultRef.value) {
      Notify.create({
        type: 'negative',
        message: i18n.t('camera.liveResult.noRef') as string,
      });

      throw new Error(i18n.t('camera.liveResult.noRef'));
    }
    resultDraws.value.forEach((child) => liveResultRef.value?.removeChild(child));

    resultDraws.value.splice(0);

    result.value.forEach((res) => {
      if (res.score > 0.66) {
        const highlighter = document.createElement('div');
        const resultText = document.createElement('p');
        resultText.innerText = res.class;
        highlighter.setAttribute('class', 'highlighter');
        highlighter.appendChild(resultText);

        highlighter.style = `left: ${res.bbox[0]}px; top: ${
          res.bbox[1]}px; width: ${
          res.bbox[2]}px; height: ${
          res.bbox[3]}px;`;

        liveResultRef.value?.appendChild(highlighter);
        resultDraws.value.push(highlighter);
      }
    });

    window.requestAnimationFrame(async () => {
      await detect();
      await drawResult();
    });
  }

  return {
    detect,
    result: computed(() => result.value),
    setVideoSource,
    setLiveResultSource,
    drawResult,
  };
};
