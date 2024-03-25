<script setup lang="ts">
import InputLabel from '@/components/inputs/InputLabel.vue'

const { label } = defineProps<{
  label?: string
}>()

const date = defineModel<string>('date', {
  required: true
})
</script>

<template>
  <InputLabel :label>
    <input type="datetime-local" v-model="date" />
  </InputLabel>
</template>

<style scoped>
input {
  border: var(--color-green) 1px solid;
  background: transparent;
  color: var(--color-heading);
  padding: 0.5rem 1rem;
  min-height: 2.5rem;
  min-width: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-family: inherit;
}

input:focus-visible {
  outline: 1px solid var(--color-outline);
}

input::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
