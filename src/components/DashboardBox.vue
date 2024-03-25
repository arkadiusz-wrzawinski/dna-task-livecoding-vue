<script setup lang="ts"></script>

<template>
  <div>
    <span><slot name="value" />{{' '}}</span>
    <slot name="label" />
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  flex-grow: 1;
  height: 100px;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid var(--color-border);
  border-radius: 5px;
}

span {
  font-size: 24px;
  color: var(--color-green);
}
</style>
