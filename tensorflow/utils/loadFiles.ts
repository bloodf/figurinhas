import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import * as tf from '@tensorflow/tfjs-node-gpu';
import consola from 'consola';
import type { Tensor } from '@tensorflow/tfjs-node-gpu';
import { worldCup2022CodeLabels } from '../labels/worldCup2022';

export const loadImages = async (dataDir: string): Promise<[Tensor[], number[]]> => {
  const images: Tensor[] = [];
  const labels: number[] = [];
  consola.info(`Loading images from ${dataDir}`);
  const files = readdirSync(dataDir);

  files.forEach((file) => {
    if (!file.toLocaleLowerCase()
      .endsWith('.png')) {
      return;
    }

    const filePath = join(dataDir, file);

    consola.info(`Loading image ${filePath}`);

    const buffer = readFileSync(filePath);

    const imageTensor = tf.node.decodeImage(buffer, 1)
      .resizeNearestNeighbor([128, 128])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();

    images.push(imageTensor);

    const [country, num, isEmpty] = file.toLocaleLowerCase()
      .split('.png')
      ?.shift()
      ?.split('_')
      .map((l) => l.trim()
        .toUpperCase());

    const tmpLabels: string[] = [];

    if (isEmpty) {
      tmpLabels.push('100');
    } else {
      tmpLabels.push('101');
    }

    tmpLabels.push(String(1000 + worldCup2022CodeLabels.findIndex((l) => l === country)));

    tmpLabels.push(String(num + 10000));

    labels.push(Number(tmpLabels.join('')));

    consola.info(`Label: ${JSON.stringify(tmpLabels)}`);
    consola.info(`Image ${filePath} loaded successfully`);
  });

  return [images, labels];
};
