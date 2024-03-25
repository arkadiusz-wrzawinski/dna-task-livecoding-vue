<script setup lang="ts">
import { computed, ref } from 'vue'

import CurrencyBox from '@/components/CurrencyBox.vue'
import NumberBox from '@/components/NumberBox.vue'
import { useTransactions } from '@/composables/useTransactions'
import { useMerchants } from '@/composables/useMerchants'
import MainContainer from '@/components/MainContainer.vue'

const [fetchedTransactions, fetchedMerchants] = await Promise.all([
  useTransactions(),
  useMerchants()
])

const transactions = ref(fetchedTransactions.value.data)
const transactionsSum = computed(() =>
  parseInt(transactions.value.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2), 10)
)

const merchants = ref(fetchedMerchants.value.data)

const hasFetchingErrors = computed(() => fetchedTransactions.value.error || fetchedMerchants.value.error)
</script>

<template>
  <MainContainer>
    <div v-if="!hasFetchingErrors">
      <CurrencyBox :value="transactionsSum" currency-sign="$" label="Profit" prefix />
      <NumberBox :value="transactions.length" label="Transactions" />
      <NumberBox :value="merchants.length" label="Merchants" />
    </div>
    <p v-else>Data couldn't be fetched. Please try again later.</p>
  </MainContainer>
</template>

<style scoped>
  div {
    display: flex;
    gap: 2%;
  }
  p {
    color: var(--color-heading);
    text-align: center;
    padding: 2rem;
  }
</style>
