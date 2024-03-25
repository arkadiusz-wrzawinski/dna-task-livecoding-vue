import { type QueryFunction, useQuery } from '@tanstack/vue-query'
import { type Ref, ref } from 'vue'

export type Result<T> = { data: T[]; error: boolean }

function makeError<T>(): Result<T> {
  return { error: true, data: [] }
}

function makeSuccess<T>(data: T[]): Result<T> {
  return { error: false, data }
}

export async function jsonFetcher<T>(url: string): Promise<Result<T>> {
  try {
    const response = await fetch(url)
    return response.ok ? makeSuccess(await response.json()) : makeError()
  } catch {
    return makeError()
  }
}

export async function useSuspendedCachedFetch<T>(
  queryKey: string[],
  queryFn: QueryFunction<Result<T>>,
  retry: number | boolean = 3,
):Promise<Ref<Result<T>>> {
  const { suspense } = useQuery<Result<T>>({
    queryKey,
    queryFn,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
    retry,
  })

  const { data } = await suspense()
  return ref(data ? data as Result<T> : makeError<T>()) as Ref<Result<T>> //Known and accepted type cast https://github.com/vuejs/core/issues/2136
}
