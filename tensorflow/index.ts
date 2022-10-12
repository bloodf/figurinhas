import '@tensorflow/tfjs-node-gpu';
import { join } from 'path';
import consola from 'consola';
import { StickersDataset } from './class/stickersDataset';
import { createModel } from './model/create';

async function run(epochs: number, batchSize: number) {
  const data = new StickersDataset();
  const model = createModel();

  const modelSavePath = join(__dirname, '../', 'public', 'models');

  await data.loadData();

  const {
    images: trainImages,
    labels: trainLabels,
  } = data.getTrainData();

  consola.info(`Training Images (Shape): ${trainImages.shape}`);
  consola.info(`Training Labels (Shape): ${trainLabels.shape}`);

  model.summary();

  const validationSplit = 0.15;

  await model.fit(trainImages, trainLabels, {
    epochs,
    batchSize,
    validationSplit,
    verbose: 2,
  });

  const {
    images: testImages,
    labels: testLabels,
  } = data.getTestData();

  const evalOutput = model.evaluate(testImages, testLabels);

  consola.success(
    `Evaluation result:\n Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; \nAccuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);

  if (modelSavePath) {
    await model.save(`file://${modelSavePath}`);
    consola.success(`Saved model to path: ${modelSavePath}`);
  }
}

run(1000, 10);
