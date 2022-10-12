<template>
  <div ref="element" class="liveResult">
    <slot/>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const element = ref();

defineExpose({
  element,
});
</script>
<style>
.liveResult {
  position: relative;
  width: 100%;
  height: 100%;
}

.liveResult  p{
  background: #71F4EBFF;
}

.highlighter {
  border: 1px dashed #fff;
  z-index: 1;
  position: absolute;
}
</style>
