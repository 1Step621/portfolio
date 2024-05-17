<script lang="ts" setup>
defineProps<{
  title: string;
  url?: string;
  image?: string;
}>();
</script>

<template>
  <a :href="url" :class="$style.card">
    <img v-if="image" :src="image" alt="Image" />
    <span>{{ title }}</span>
  </a>
</template>

<style module>
.card {
  display: flex;
  flex-direction: column;
  font-weight: normal;
  font-size: var(--h4-size);
  color: var(--c-text);
  background-color: var(--c-panel);
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: solid 1px var(--c-divider);
  transition: background-color 0.2s, border-color 0.2s;
}

.card:hover {
  background-color: var(--c-panel-hover);
  border-color: var(--c-primary);
}

.card img {
  width: 100%;
  height: 130px;
  object-fit: cover;
  background-color: #f4f5f7;
  border-radius: 10px 10px 0 0;
}

.card span {
  padding: 10px;
  text-align: center;
}
</style>