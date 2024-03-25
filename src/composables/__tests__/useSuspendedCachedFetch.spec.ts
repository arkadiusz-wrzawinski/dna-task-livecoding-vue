import {describe, it, expect} from 'vitest'
import { useSuspendedCachedFetch, jsonFetcher, Result } from '../useSuspendedCachedFetch'
import { App, createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

describe('jsonFetcher', () => {
  it('should return data if the fetch completes', async () => {
    const result = await jsonFetcher('http://localhost:8000/transactions')
    expect(result.error).toBe(false)
    expect(result.data).toBeDefined()
  })

  it('should return error if the fetch fails', async () => {
    const result = await jsonFetcher('THIS_URL_DOES_NOT_EXIST')
    expect(result.error).toBe(true)
    expect(result.data).toEqual([])
  })
})

function wrap<T>(composable: () => T): [T, App<Element>] {
  let result: T;
  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    }
  })
  app.use(VueQueryPlugin)
  app.mount(document.createElement('div'))

  return [result, app]
}

async function succeedingMockFetcher(): Promise<Result<undefined>>  {
  return { error: false, data: [] }
}

async function failingMockFetcher(): Promise<Result<undefined>> {
throw new Error('Failed to fetch')
}

describe('useSuspendedCachedFetch', () => {
  it('should return data if the fetch completes', async () => {
    const [result] = wrap(() => useSuspendedCachedFetch(['key'], succeedingMockFetcher, false))
    expect((await result).value.error).toBe(false)
    expect((await result).value.data).toBeDefined()
  })

  it('should return error if the fetch fails', async () => {
    const [result] = wrap(() => useSuspendedCachedFetch(['key'], failingMockFetcher, false))
    expect((await result).value.error).toBe(true)
    expect((await result).value.data).toEqual([])
  })
})
