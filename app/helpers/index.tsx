import { JSONFileState } from '../hooks/getJSONFileData'
import { currencyStateInterface, currencyItem } from '../hooks/getAllCurrencies'
import { productInterface } from '../hooks/getAllProducts'

export function findExchangeRate(
  base: string,
  target: string,
  exchangeRates: currencyStateInterface,
): number | undefined {
  if (exchangeRates.status === 'downloading' || !target) {
    // either exchangeRates haven't loaded yet or target isn't defined
    return undefined
  }

  if (base === undefined || target === undefined) {
    return undefined
  }

  if (base === target) {
    // same currency
    return 1
  }

  const baseDef = exchangeRates.data.find((item) => item.base === base)
  const exRate = baseDef ? baseDef.rates[target] : undefined
  return exRate
}

export function findProductByID(
  id: number,
  products: productInterface[],
): productInterface | undefined {
  return products ? products.find((item) => item.id === id) : undefined
}

export type users = 'user' | 'admin'

export const clampNumber = (min: number, max: number) => (
  value: number,
): number => {
  if (value < min) return min
  if (value > max) return max
  // is within range
  return value
}

export function assert(value: boolean, message: string) {
  console.count(value ? 'test pass' : 'test fail')
  console.assert(value, message)
}
