<script lang="ts" setup>
defineProps<{
  title: string;
  description?: string;
  url?: string;
  image?: string;
}>();
</script>

<template>
  <a :href="url" :class="$style.card">
    <img :class="$style.image" v-if="image" :src="image" alt="Image" />
    <div :class="$style.bottom">
      <span :class="$style.title">{{ title }}</span>
      <span :class="$style.description" v-if="description">{{ description }}</span>
    </div>
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

.image {
  width: 100%;
  height: 130px;
  object-fit: cover;
  background-color: #f4f5f7;
  border-radius: 10px 10px 0 0;
}

.bottom {
  display: flex;
  padding: 10px;
  text-align: center;
  flex-direction: column;
}

.title {
  text-align: center;
}

.description {
  font-size: var(--small-text-size);
  color: var(--c-text-weaker);
}
</style>