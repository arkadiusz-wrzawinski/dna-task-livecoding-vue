import type { RawTransaction } from '@/types/Transaction.type'
import { jsonFetcher, useSuspendedCachedFetch } from '@/composables/useSuspendedCachedFetch'
import { computed } from 'vue'

export async function useTransactions() {
  const result = (
    await useSuspendedCachedFetch<RawTransaction>(['transactions'], () =>
      jsonFetcher('http://localhost:8000/transactions')
    )
  ).value
  return computed(() => ({
    error: result.error,
    data: result.data.map((transaction) => ({ ...transaction, date: new Date(transaction.date) }))
  }))
}
