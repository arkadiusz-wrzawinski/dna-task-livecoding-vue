<script setup lang="ts"></script>

<template>
  <main>
    <slot />
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 4rem 2rem;
}
</style>
