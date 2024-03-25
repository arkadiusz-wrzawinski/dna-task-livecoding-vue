<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <label>
    <span v-if="label">{{ label }}</span>
    <slot />
  </label>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

span {
  display: block;
  white-space: nowrap;
}
</style>
