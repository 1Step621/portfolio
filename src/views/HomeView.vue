<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { TresCanvas } from '@tresjs/core'
import { ACESFilmicToneMapping, Vector3 } from 'three';
import IconCube from '@/components/IconCube.vue';
import MeCode from '@/components/MeCode.vue';

useHead({
  title: '1Step621',
});
</script>

<template>
  <div :class="$style.heroView">
    <div :class="$style.canvasWrapper">
      <TresCanvas :alpha="true" :tone-mapping="ACESFilmicToneMapping">
        <TresPerspectiveCamera :position="new Vector3(2, 2, 2)" :look-at="[0, 0, 0]" />
        <Suspense>
          <IconCube />
        </Suspense>
        <TresAmbientLight :intensity="0.2" />
        <TresDirectionalLight :intensity="1" />
      </TresCanvas>
    </div>
    <Suspense>
      <MeCode :class="$style.code" />
    </Suspense>
  </div>
  <div class="main">
    <h1>1Step621のホームページ</h1>
    <p>1Step621です。高専2年です。指をめっちゃ逆向きに曲げられます。</p>
    <h2>できること</h2>
    <p>TypeScript, Vue, Dart, Rust, C++, Python, などなど...</p>
    <h2>趣味</h2>
    <ul>
      <li>Webサイトやスマホアプリを作っています。</li>
      <li>
        東京高専ロボコンゼミでロボットを動かしたりもしています↓
        <ul>
          <li>関東春ロボコン2024「一夜城」 ピット</li>
          <li>高専ロボコン2024「Astarium」 ピット</li>
        </ul>
      </li>
      <li>Misskeyが好きでよく<a href="https://misskey.backspace.fm/@1Step621">BackspaceKey</a>にいます。たまにMisskey本体にプルリクエストを送ってます。</li>
      <li>VOCALOID(広義)が好きです。100選は<a href="https://kiite.jp/playlist/4MlFlZ4kFB">こちら</a>。</li>
    </ul>
    <h2>Favorite Tools</h2>
    <p>Ubuntu, VSCode, JetBrains, WezTerm, Google日本語入力+AZIK</p>
  </div>
</template>

<style module>
.heroView {
  width: 100%;
  height: 400px;
  margin: auto;
  position: relative;
  background: linear-gradient(20deg, transparent, #3793a62e);
  overflow: hidden;
}

.canvasWrapper {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.code {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 500px) {
  .heroView {
    height: 350px;
  }

  .canvasWrapper {
    width: 300px;
    height: 300px;
  }

  .code {
    display: none;
  }
}
</style>
