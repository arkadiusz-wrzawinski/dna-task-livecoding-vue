<script setup lang="ts">
import DashboardBox from '@/components/DashboardBox.vue'

const { currencySign, value, label, prefix } = defineProps<{
  currencySign: string
  value: number
  label: string
  prefix?: boolean
}>()
</script>

<template>
  <DashboardBox>
    <template #value>
      <span>{{ prefix ? currencySign : '' }}{{ value }}{{ !prefix ? currencySign : '' }}</span>
    </template>
    <template #label>
      {{ label }}
    </template>
  </DashboardBox>
</template>
