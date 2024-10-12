<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'click'): void
}>();
</script>
<template>
<button :class="$style.button" @click="emit('click')">
  <slot />
</button>
</template>
<style module>
.button {
  color: var(--c-text);
  background-color: var(--c-panel);
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.button:hover {
  background-color: var(--c-panel-hover);
}
</style>
