import { JSONFileState } from '../hooks/getJSONFileData'
import { currencyInterface } from '../hooks/getAllCurrencies'
import { productInterface } from '../hooks/getAllProducts'

export function findExchangeRate (base:string, target:string, exchangeRates:JSONFileState<currencyInterface, 'base'>):number | undefined {
  if (exchangeRates.status === 'downloading' || !target){
    // either exchangeRates haven't loaded yet or target isn't defined
    return undefined
  }

  if (base === target){
    // same currency
    return 1;
  }

  const baseDef = exchangeRates.data.find(item => item.base === base)
  const exRate = baseDef ? baseDef.rates[target] : undefined;
  return exRate;
}

export function findProductByID(id:any, products:productInterface[]):productInterface | undefined{
  return products ? products.find(item => item.id === id) : undefined;
}

export type users = "user" | "admin"