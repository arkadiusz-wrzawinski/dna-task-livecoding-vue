<script setup lang="ts">
import DashboardBox from '@/components/DashboardBox.vue'

const { value, label } = defineProps<{
  value: number
  label: string
}>()
</script>

<template>
  <DashboardBox>
    <template #value>
      <span>{{ value }}</span>
    </template>
    <template #label>
      {{ label }}
    </template>
  </DashboardBox>
</template>
