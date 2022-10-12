import * as tf from '@tensorflow/tfjs-node-gpu';

const kernelSize: [number, number] = [3, 3];
const poolSize: [number, number] = [2, 2];
const firstFilters = 32;
const dropoutConv = 0.3;
const dropoutDense = 0.3;

export const createModel = () => {
  const model = tf.sequential({
    layers: [
      tf.layers.conv2d({
        inputShape: [128, 128, 1],
        filters: firstFilters,
        kernelSize,
        activation: 'relu',
      }),
      tf.layers.maxPooling2d({ poolSize }),
      tf.layers.dropout({ rate: dropoutConv }),
      tf.layers.flatten({
        dtype: 'int32',
      }),
      tf.layers.dense({
        units: 128,
        activation: 'relu',
      }),
      tf.layers.dropout({ rate: dropoutDense }),
      tf.layers.dense({
        units: 5,
        activation: 'softmax',
      }),
    ],
  });

  model.compile({
    optimizer: tf.train.adam(0.0001),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
};
