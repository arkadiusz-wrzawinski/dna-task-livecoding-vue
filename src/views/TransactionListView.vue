<script setup lang="ts">
import { useTransactions } from '@/composables/useTransactions'
import { useMerchants } from '@/composables/useMerchants'
import { computed, ref } from 'vue'
import DateTimeRange from '@/components/inputs/DateTimeRange.vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import DropdownInput from '@/components/inputs/dropdown/DropdownInput.vue'
import MainContainer from '@/components/MainContainer.vue'
import TransactionsTable from '@/components/TransactionsTable.vue'
import type { Transaction } from '@/types/Transaction.type'
import CurrencyBox from '@/components/CurrencyBox.vue'
import NumberBox from '@/components/NumberBox.vue'

const [fetchedTransactions, fetchedMerchants] = await Promise.all([
  useTransactions(),
  useMerchants()
])
const transactions = ref(fetchedTransactions.value.data)
const merchants = ref(fetchedMerchants.value.data)
const normalizedMerchants = computed(
  () => new Map(merchants.value.map((merchant) => [merchant.id, merchant.name]))
)

const storedFilters = useLocalStorage<{
  merchants: string[]
  period: {
    start: string
    end: string
  }
}>('transactions-list-filters', {
  merchants: [],
  period: {
    start: '',
    end: ''
  }
})

const selectedMerchants = computed({
  get: () => storedFilters.value.merchants,
  set: (value) => (storedFilters.value.merchants = value)
})

const periodStart = computed({
  get: () => storedFilters.value.period.start,
  set: (value) => (storedFilters.value.period.start = value)
})

const periodEnd = computed({
  get: () => storedFilters.value.period.end,
  set: (value) => (storedFilters.value.period.end = value)
})

const merchantOptions = computed(() =>
  merchants.value.map((merchant) => ({
    label: merchant.name,
    value: merchant.id
  }))
)

const periodStartTime = computed(() => new Date(periodStart.value).getTime())
const periodEndTime = computed(() => new Date(periodEnd.value).getTime())

function isWithinPeriod(transaction: Transaction) {
  return (
    transaction.date.getTime() >= periodStartTime.value &&
    transaction.date.getTime() <= periodEndTime.value
  )
}

const transactionsOfMerchants = computed(() =>
  transactions.value
    .filter((transaction) => selectedMerchants.value.includes(transaction.merchantId))
    .map((transaction) => ({
      ...transaction,
      merchantName: normalizedMerchants.value.get(transaction.merchantId)
    }))
)

const transactionsWithinPeriod = computed(() => transactions.value.filter(isWithinPeriod))
const transactionsWithinPeriodSum = computed(() =>
  parseInt(
    transactionsWithinPeriod.value.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2),
    10
  )
)

const isMissingPeriodStart = computed(() => isNaN(periodStartTime.value))
const isMissingPeriodEnd = computed(() => isNaN(periodEndTime.value))
const isPeriodEndBeforeStart = computed(() => periodStartTime.value > periodEndTime.value)

const isMissingMerchants = computed(() => selectedMerchants.value.length === 0)

const hasFetchingErrors = computed(() => fetchedTransactions.value.error || fetchedMerchants.value.error)
</script>

<template>
  <MainContainer>
    <h1>Transactions</h1>
    <template v-if="!hasFetchingErrors">
      <div class="filters">
        <DropdownInput
          :options="merchantOptions"
          v-model:selected-keys="selectedMerchants"
          placeholder="Merchants"
          label="Merchants"
        />
        <DateTimeRange v-model:start="periodStart" v-model:end="periodEnd" />
      </div>

      <div
        class="boxes"
        v-if="!isMissingPeriodStart && !isMissingPeriodEnd && !isPeriodEndBeforeStart"
      >
        <CurrencyBox :value="transactionsWithinPeriodSum" currency-sign="$" label="Profit" prefix />
        <NumberBox :value="transactionsWithinPeriod.length" label="Transactions" />
      </div>
      <p v-else>Please select a valid period.</p>

      <TransactionsTable v-if="!isMissingMerchants" :transactions="transactionsOfMerchants" />
      <p v-else>Please select a merchant.</p>
    </template>
    <p v-else>Data couldn't be fetched. Please try again later.</p>
  </MainContainer>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  justify-content: space-between;
}

.boxes {
  display: flex;
  gap: 2%;
}

p {
  color: var(--color-heading);
  text-align: center;
  padding: 2rem;
}
</style>
