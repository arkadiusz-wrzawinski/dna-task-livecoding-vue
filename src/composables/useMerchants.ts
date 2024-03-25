import { jsonFetcher, useSuspendedCachedFetch } from '@/composables/useSuspendedCachedFetch'
import type { Merchant } from '@/types/Merchant.type'

export async function useMerchants() {
  return await useSuspendedCachedFetch<Merchant>(['merchants'], () =>
    jsonFetcher('http://localhost:8000/merchants')
  )
}
