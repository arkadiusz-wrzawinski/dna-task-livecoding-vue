export type Transaction = {
  amount: number
  date: Date
  id: string
  merchantId: string
  userId: string
}

export type RawTransaction = {
  amount: number
  date: string
  id: string
  merchantId: string
  userId: string
}
