<script setup lang="ts">
import { IconBrandGithub, IconBrandX } from '@tabler/icons-vue';
</script>

<template>
  <footer>
    <div :class="$style.content">
      <div :class="$style.left">
        <p>&copy; 2024- 1Step621</p>
      </div>
      <div :class="$style.right">
        <a href="https://misskey.backspace.fm/@1Step621">Misskey</a>
        <a href="https://x.com/onestep621"><IconBrandX size="25" /></a>
        <a href="https://zenn.dev/1step621">Zenn</a>
        <a href="https://github.com/1STEP621"><IconBrandGithub size="25" /></a>
      </div>
    </div>
  </footer>
</template>

<style module>
footer {
  background-color: var(--c-panel);
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  width: min(100%, var(--main-width));
}

.left {
  color: var(--c-text-weaker);
}

.right {
  display: flex;
  gap: 20px;
}

@media screen and (max-width: 768px) {
  .right {
    flex-direction: column;
    align-items: end;
    gap: 5px;
  }
}

.right * {
  display: inline-flex;
  justify-content: center;
  font-weight: normal;
  color: var(--c-text-weaker);
}
</style>
