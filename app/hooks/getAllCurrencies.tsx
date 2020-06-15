import React from 'react'
import getJSONFileData, { JSONFileState } from './getJSONFileData'

export interface currencyItem {
  base: string
  rates: {
    [key: string]: number
  }
}

export type currencyStateInterface = JSONFileState<currencyItem, 'base'>

const exchange_rates_file_url = '/exchange_rates.json'

const getAllCurrencies = () => {
  const {
    stateValue: allCurrencies,
    selectItemByKey: setSelectedCurrency,
  } = getJSONFileData<currencyItem, 'base'>(
    exchange_rates_file_url,
    'exchangeRates',
    'base',
  )
  return { allCurrencies, setSelectedCurrency }
}

export default getAllCurrencies
