import * as tf from '@tensorflow/tfjs';
import { join } from 'path';
import consola from 'consola';
import { Tensor } from '@tensorflow/tfjs-node-gpu';
import { loadImages } from '../utils/loadFiles';

export class StickersDataset {
  private trainData: [Tensor[], number[]];

  private testData: [Tensor[], number[]];

  public readonly TRAIN_IMAGES_DIR = join(__dirname, '..', 'data', 'images');

  public readonly TEST_IMAGES_DIR = join(__dirname, '..', 'data', 'test');

  constructor() {
    this.trainData = [[], []];
    this.testData = [[], []];
  }

  async loadData() {
    try {
      consola.info('Loading training data...');
      this.trainData = await loadImages(this.TRAIN_IMAGES_DIR);

      consola.info('Loading test data...');
      this.testData = await loadImages(this.TEST_IMAGES_DIR);

      consola.success('Images loaded successfully');
    } catch (e) {
      consola.error(e);
    }
  }

  getTrainData() {
    console.log(this.trainData);
    return {
      images: tf.concat(this.trainData[0]),
      labels: tf.oneHot(tf.tensor1d(this.trainData[1]).toInt(), 5).toFloat(),
    };
  }

  getTestData() {
    return {
      images: tf.concat(this.testData[0]),
      labels: tf.oneHot(tf.tensor1d(this.testData[1]).toInt(), 5).toFloat(),
    };
  }
}
