<script setup lang="ts">
import type { Option } from '@/types/Option.type'

const { selectMany, label, value } = defineProps<Option & { selectMany: boolean }>()
const selected = defineModel<boolean>('selected', {
  required: true
})
</script>

<template>
  <li>
    <label>
      <input
        :type="selectMany ? 'checkbox' : 'radio'"
        :id="value"
        v-model="selected"
        :checked="selected"
      />
      <span>{{ label }}</span>
    </label>
  </li>
</template>

<style scoped>
label {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem 1rem;
}

span {
  white-space: nowrap;
}
</style>
