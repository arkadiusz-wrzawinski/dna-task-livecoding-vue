<script setup lang="ts">
import { ref, computed } from 'vue'
import InputLabel from '@/components/inputs/InputLabel.vue'
import DropdownOptionDefault from '@/components/inputs/dropdown/DropdownOptionDefault.vue'
import type { Option } from '@/types/Option.type'

const visible = ref(false)

const selected = defineModel<string[]>('selectedKeys', {
  required: true
})

const {
  options,
  placeholder,
  selectMany = false,
  label
} = defineProps<{
  options: Option[]
  placeholder?: string
  label?: string
  selectMany?: boolean
}>()

function toggle(id: string) {
  if (selectMany) {
    if (selected.value.includes(id)) {
      selected.value = selected.value.filter((_id) => _id !== id)
    } else {
      selected.value = [...selected.value, id]
    }
  } else {
    selected.value = [id]
  }
}

function hide() {
  visible.value = false
}

const buttonOutline = computed(() => (visible.value ? '1px solid var(--color-outline)' : 'none'))
</script>

<template>
  <InputLabel :label>
    <div class="wrapper" v-click-outside="hide">
      <button @click="visible = !visible">
        <span>{{ placeholder ?? 'Options' }}</span>
        <span v-if="selected.length !== 0" class="indicator">{{ selected.length }}</span>
        <span>{{ visible ? '▲' : '▼' }}</span>
      </button>
      <ul class="list" v-if="visible">
        <slot
          name="option"
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :label="option.label"
          :select-many="selectMany"
          :selected="selected.includes(option.value)"
          :onSelect="() => toggle(option.value)"
        >
          <DropdownOptionDefault
            :key="option.value"
            :value="option.value"
            :label="option.label"
            :select-many="selectMany"
            @update:selected="() => toggle(option.value)"
            :selected="selected.includes(option.value)"
          />
        </slot>
      </ul>
    </div>
  </InputLabel>
</template>

<style scoped>
.wrapper {
  position: relative;
}

.list {
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  border: var(--color-green) 1px solid;
  background: var(--color-background-secondary);
  z-index: 1;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
}

button {
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
  outline: v-bind(buttonOutline);
}

button:focus-visible {
  outline: 1px solid var(--color-outline);
}

.indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: var(--color-green);
  color: var(--color-outline);
  text-align: center;
}
</style>
