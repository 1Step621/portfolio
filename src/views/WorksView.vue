<script setup lang="ts">
import { useHead } from '@unhead/vue';
import WorkCard from '@/components/WorkCard.vue';

useHead({
  title: 'Works | 1Step621',
});
</script>

<template>
  <div :class="$style.main">
    <h1>Works</h1>
    <WorkCard title="MFM-Artist" url="https://1step621.github.io/mfm-artist/" />
    <WorkCard title="ローマ字ぜんぶ見る" url="https://1step621.github.io/romaji_zenbumiru/" />
    <WorkCard title="ScrollMark - スクロール位置を記憶しておくChrome拡張" url="https://1step621.github.io/ScrollMark/" />
    <WorkCard title="ギリ読めないフォント - 自作フォント" url="https://1step621.github.io/giri-font/" image="https://1step621.github.io/giri-font/glyphs.svg" />
  </div>
</template>

<style module>
.main {
  width: 100%;
  max-width: var(--main-width);
  padding: 50px 35px;
}

.main>* {
  margin: 15px 0;
}
</style>
