<script setup lang="ts">
import { useHead } from '@unhead/vue';
import WorkCard from '@/components/WorkCard.vue';
import hokoraSweeper from './works/hokora-sweeper/thumbnail.png';

useHead({
  title: 'Works | 1Step621',
});
</script>

<template>
  <div class="main">
    <h1>Works</h1>
    <WorkCard title="祠スイーパー" description="祠のマインスイーパー" url="./works/hokora-sweeper" :image="hokoraSweeper" />
    <WorkCard title="奇声ツイートジェネレータ" url="./works/insane-tweet" />
    <WorkCard title="MFM-Artist" description="Misskeyの投稿装飾構文をかんたんに生成するツール" url="https://1step621.github.io/mfm-artist/" />
    <WorkCard title="ローマ字ぜんぶ見る" url="https://1step621.github.io/romaji_zenbumiru/" />
    <WorkCard title="ScrollMark" description="スクロール位置を記憶しておくChrome拡張機能" url="https://1step621.github.io/ScrollMark/" />
    <WorkCard title="ギリ読めないフォント" description="ギリギリ読めないフォント" url="https://1step621.github.io/giri-font/" />
  </div>
</template>
