<script setup lang="ts">
import { useRenderLoop, useTexture } from '@tresjs/core';
import { RoundedBox } from '@tresjs/cientos';
import Icon from '@/assets/icon-for-texture.png';
import { ref } from 'vue';
import { Euler, Vector3 } from 'three';
import { randFloat } from 'three/src/math/MathUtils.js';

const iconTexture = await useTexture({
  map: Icon,
});

const rotation = ref({
  x: 0,
  y: 0,
  z: 0,
});

const pcs = {
  r: 0, 
  theta: 0, 
  phi: 0
};
let frame = 0;
const xInterceptTheta = randFloat(-1, 1);
const xInterceptPhi = randFloat(-1, 1);
const { onLoop } = useRenderLoop();
onLoop(() => {
  pcs.r = 0.01;
  pcs.theta = Math.sin(frame / 1000 - xInterceptTheta) * Math.PI;
  pcs.phi = Math.sin(frame / 1000 - xInterceptPhi) * Math.PI;
  rotation.value.x += pcs.r * Math.sin(pcs.theta) * Math.cos(pcs.phi);
  rotation.value.y += pcs.r * Math.sin(pcs.theta) * Math.sin(pcs.phi);
  rotation.value.z += pcs.r * Math.cos(pcs.theta);
  frame++;
});
</script>

<template>
  <TresMesh :position="new Vector3(0, 0, 0)" :rotation="new Euler(...Object.values(rotation))"> 
    <RoundedBox :args="[2, 2, 2, 8, 0.66]">
      <TresMeshPhongMaterial v-bind="iconTexture" />
    </RoundedBox>
  </TresMesh>
</template>
