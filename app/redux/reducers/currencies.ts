import {
  CURRENCIES_ADD,
  CURRENCIES_SELECT,
  ACTION_CURRENCIES_SELECT,
  ACTION_CURRENCIES_ADD,
} from '../actionTypes'

// import { currencyItem } from '../../hooks/getAllCurrencies'
export interface currencyItem {
  base: string
  rates: {
    [key: string]: number
  }
}

export interface currenciesState {
  selected: currencyItem['base']
  allCurrencies: currencyItem[]
}

const initalState: currenciesState = {
  selected: undefined,
  allCurrencies: [],
}

const isValidCurrency = (item): item is currencyItem => {
  return (
    item &&
    typeof item.base === 'string' &&
    item.base.length === 3 &&
    typeof item.rates === 'object' &&
    Object.keys(item.rates).every(
      (key) => typeof key === 'string' && typeof item.rates[key] === 'number',
    )
  )
}

export default function (
  state: currenciesState = initalState,
  action: ACTION_CURRENCIES_ADD | ACTION_CURRENCIES_SELECT,
): currenciesState {
  switch (action.type) {
    case CURRENCIES_ADD:
      if (isValidCurrency(action.payload)) {
        return {
          ...state,
          allCurrencies: [...state.allCurrencies, action.payload],
        }
      } else if (
        Array.isArray(action.payload) &&
        action.payload.every(isValidCurrency)
      ) {
        return {
          ...state,
          allCurrencies: [...state.allCurrencies, ...action.payload],
        }
      }
      break
    case CURRENCIES_SELECT:
      if (
        action.payload &&
        typeof action.payload === 'string' &&
        state.allCurrencies.some((item) => item.base === action.payload)
      ) {
        return { ...state, selected: action.payload }
      }
      break
  }

  // not a valid event
  return state
}
