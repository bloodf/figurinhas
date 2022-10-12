import { computed, ref } from 'vue';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { Notify } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useDebounceFn } from '@vueuse/core';

export const useTensorFlow = () => {
  const i18n = useI18n();
  const result = ref<Array<{
    className: string;
    probability: number;
  }>>();
  const resultDraws = ref<(HTMLDivElement | Element)[]>([]);
  const videoRef = ref<HTMLVideoElement>();
  const liveResultRef = ref<HTMLDivElement>();

  const setVideoSource = (video: HTMLVideoElement) => {
    videoRef.value = video;
  };

  const setLiveResultSource = (video: HTMLDivElement) => {
    liveResultRef.value = video;
  };

  /*  const getLabelsAsObject = (labels) => {
     let labelObject = {};
     for (let i = 0; i < labels.length; i++) {
       const label = labels[i];
       if (labelObject[label] === undefined) {
         // only assign it if we haven't seen it before
         labelObject[label] = Object.keys(labelObject).length;
       }
     }
     return labelObject;
   }

   const addLabels = (labels) => {
     return tf.tidy(() => {
       const classes = getLabelsAsObject(labels);
       const classLength = Object.keys(classes).length;

       let ys;
       for (let i = 0; i < labels.length; i++) {
         const label = labels[i];
         const labelIndex = classes[label];
         const y = oneHot(labelIndex, classLength);
         if (i === 0) {
           ys = y;
         } else {
           ys = ys.concat(y, 0);
         }
       }
       return ys;
     });
   }; */

  async function detect(): Promise<Array<{
    className: string;
    probability: number;
  }>> {
    if (videoRef.value) {
      const MobileNetModel = await mobilenet.load({
        modelUrl: './models/model.json',
        version: 2,
      });

      const prediction = await MobileNetModel.classify(videoRef.value);
    console.log(prediction);
      result.value = prediction;

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

    if (Array.isArray(result.value)) {
      result.value.forEach((res) => {
        console.log(res);
        /* if (res.rank > 0.66) {
          const highlighter = document.createElement('div');
          const resultText = document.createElement('p');
          resultText.innerText = JSON.stringify(res.dataId);
          highlighter.setAttribute('class', 'highlighter');
          highlighter.appendChild(resultText);

          highlighter.style = `left: ${res.bbox[0]}px; top: ${
            res.bbox[1]}px; width: ${
            res.bbox[2]}px; height: ${
            res.bbox[3]}px;`;

          liveResultRef.value?.appendChild(highlighter);
          resultDraws.value.push(highlighter);
        } */
      });
    }
    const debouncedFn = useDebounceFn(async () => {
      await detect();
      await drawResult();
    }, 1000);

    window.requestAnimationFrame(debouncedFn);
  }

  return {
    detect,
    result: computed(() => result.value),
    setVideoSource,
    setLiveResultSource,
    drawResult,
    /*  getLabelsAsObject,
     addLabels, */
  };
};
