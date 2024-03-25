<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import router from '@/router'
import { useTransactions } from '@/composables/useTransactions'
import { useMerchants } from '@/composables/useMerchants'
import MainContainer from '@/components/MainContainer.vue'

const transactionId = ref(useRoute().params.id)
watch(transactionId, (value) => {
  if (!value) router.push('/transactions')
})

const [fetchedTransactions, fetchedMerchants] = await Promise.all([
  useTransactions(),
  useMerchants()
])
const hasFetchingErrors = computed(() => fetchedTransactions.value.error || fetchedMerchants.value.error)

const transactions = ref(fetchedTransactions.value.data)
const merchants = ref(fetchedMerchants.value.data)
const normalizedMerchants = computed(
  () => new Map(merchants.value.map((merchant) => [merchant.id, merchant.name]))
)

const transaction = computed(() => {
  const transaction = transactions.value.find(
    (transaction) => transaction.id === transactionId.value
  )
  if (!transaction) router.push('/transactions')
  return transaction!
})

const merchant = computed(() => normalizedMerchants.value.get(transaction.value.merchantId))

</script>

<template>
  <MainContainer>
    <h1>Transaction Details</h1>
    <template v-if="!hasFetchingErrors">
      <div>
        <div>
          <span>ID: </span>
          <span class="value">{{ transaction.id }}</span>
        </div>
        <div>
          <span>Date: </span>
          <span class="value">{{ transaction.date.toLocaleString() }}</span>
        </div>
        <div>
          <span>Amount: </span>
          <span class="value">{{ transaction.amount }}$</span>
        </div>
        <div>
          <span>Merchant: </span>
          <span class="value">{{ merchant }}</span>
        </div>
      </div>
    </template>
    <p v-else>Data couldn't be fetched. Please try again later.</p>
  </MainContainer>
</template>

<style scoped>
  .value {
    color: var(--color-green);
  }
  div {
    padding: 0.5rem;
  }
  p {
    color: var(--color-heading);
    text-align: center;
    padding: 2rem;
  }
</style>
