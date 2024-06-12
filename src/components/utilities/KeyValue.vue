<script lang="ts" setup>
const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <label>
    <span :class="$style.label">{{ props.label }}</span>
    <div :class="$style.value">
      <slot></slot>
    </div>
  </label>
</template>

<style module>
.label {
  display: block;
  color: var(--c-text-weaker);
}

.value {
  margin-top: 0.5rem;
}
</style>
