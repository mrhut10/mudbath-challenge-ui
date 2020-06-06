import React from 'react';
import getJSONFileData from './getJSONFileData'

export interface currencyInterface {
  base: string,
  rates: {
    [key: string]: number
  }
}

const exchange_rates_file_url = '/exchange_rates.json'

const getAllCurrencies = () => {
  const {stateValue, selectItemByKey} = getJSONFileData<currencyInterface, 'base'>(
    exchange_rates_file_url,
    'exchangeRates',
    'base'
  );
  return [stateValue, selectItemByKey];
}

export default getAllCurrencies;