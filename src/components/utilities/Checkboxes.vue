<script lang="ts" setup>
import { watch } from 'vue';

const props = defineProps<{
  checkboxes: { label: string; id?: string; }[];
  required?: boolean;
}>();

const model = defineModel<string[]>({
  required: true,
});

function onChange(e: Event, id: string) {
  if (!(e.target instanceof HTMLInputElement)) return;

  if (model.value.length === 0 && props.required) {
    e.target.parentElement!.animate([
      { transform: "translate(-5px, 0)" },
      { transform: "translate(4px, 0)" },
      { transform: "translate(-3px, 0)" },
      { transform: "translate(2px, 0)" },
      { transform: "translate(-1px, 0)" },
      { transform: "translate(0px, 0)" },
    ], 500).play();
    model.value = [id];
  }
}
</script>

<template>
  <div :class="$style.root">
    <label v-for="checkbox in props.checkboxes" :key="checkbox.label" :class="$style.button">
      {{ checkbox.label }}
      <input
        type="checkbox"
        :value="checkbox.id ?? checkbox.label"
        @change="(e) => onChange(e, checkbox.id ?? checkbox.label)"
        v-model="model"
        :class="$style.checkbox" />
    </label>
  </div>
</template>

<style module>
.root {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.button {
  display: block;
  user-select: none;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  border: 1px solid var(--c-primary);
  flex: 1;
  min-width: 120px;
  border-radius: 5px;
}

.button:has(input:checked) {
  background-color: var(--c-primary);
  color: var(--c-text);
}

.checkbox {
  display: none;
}
</style>
