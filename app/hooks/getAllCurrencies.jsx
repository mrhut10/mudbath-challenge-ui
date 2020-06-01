import React from 'react';
import getJSONFileData from './getJSONFileData'
//import { FaGasPump } from 'react-icons/fa';

const exchange_rates_file_url = '/exchange_rates.json'

const getAllCurrencies = () => {
  const [stateValue, selectItemByKey] = getJSONFileData(
    exchange_rates_file_url,
    'exchangeRates',
    'base'
  );
  return [stateValue, selectItemByKey];
}

export default getAllCurrencies;