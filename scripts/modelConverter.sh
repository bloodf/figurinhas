#bash/sh
tensorflowjs_converter \
  --input_format keras \
  --output_format tfjs_graph_model \
    mobilenetv2.h5 \
    mobilenetv2-tfjs
