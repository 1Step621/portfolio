<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'click'): void
}>();
defineProps<{
  disabled?: boolean
}>();
</script>
<template>
  <button :class="$style.button" @click="emit('click')" :disabled="disabled"
    :style="{ cursor: disabled ? 'default' : 'pointer' }">
    <slot />
  </button>
</template>
<style module>
.button {
  font-family: var(--font);
  color: var(--c-text);
  background-color: var(--c-panel);
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button:hover {
  background-color: var(--c-panel-hover);
}
</style>
