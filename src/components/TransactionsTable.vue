<script setup lang="ts">
import type { Transaction } from '@/types/Transaction.type'
import { toRefs } from 'vue'

const props = defineProps<{
  transactions: (Transaction & { merchantName?: string })[]
}>()

const { transactions } = toRefs(props)
</script>

<template>
  <div class="table">
    <div class="row">
      <div class="cell">Merchant</div>
      <div class="cell">Date</div>
      <div class="cell">Amount</div>
      <div class="cell">Actions</div>
    </div>
    <div class="row" v-for="transaction in transactions" :key="transaction.id">
      <div class="cell">{{ transaction.merchantName ?? "-" }}</div>
      <div class="cell">{{ transaction.date.toLocaleString() }}</div>
      <div class="cell">${{ transaction.amount }}</div>
      <div class="cell">
        <RouterLink :to="`/transactions/${transaction.id}`">Details ></RouterLink>
      </div>
    </div>
    <p v-if="transactions.length == 0">No transactions found</p>
  </div>
</template>

<style scoped lang="scss">
.table {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);
  border: 1px solid var(--color-border);
}

.row {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;

  &:nth-child(odd) {
    background: var(--color-background-secondary);
  }

  &:first-child {
    background: var(--color-background-tertiary);
    color: var(--color-heading);
  }
}

.cell {
  padding: 1rem;

  &:not(:first-child) {
    border-left: 1px solid var(--color-border);
  }

  &:last-child {
    text-align: right;
  }
}

p {
  color: var(--color-heading);
  text-align: center;
  grid-column: 1 / -1;
  padding: 2rem;
}

a {
  color: var(--color-green);
  text-decoration: none;
}
</style>
