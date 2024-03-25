<script setup lang="ts">
import DateTimeInput from '@/components/inputs/DateTimeInput.vue'

const start = defineModel<string>('start', { required: true })
const end = defineModel<string>('end', { required: true })
</script>

<template>
  <div>
    <DateTimeInput v-model:date="start" label="Period start" />
    <DateTimeInput v-model:date="end" label="Period end" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  gap: 1rem;
}
</style>
