export function findExchangeRate (base, target, exchangeRates) {
  if (exchangeRates.status === 'downloading'){
    // exchangeRates haven't loaded in yet
    return undefined
  }
  
  if (!target) {
    // a currency isn't selected yet
    return undefined
  }

  if (base === target){
    // same currency
    return 1;
  }

  const baseDef = exchangeRates.data.find(item => item.base === base)
  return baseDef ? baseDef.rates[target] : undefined
}

export function findProductByID(id, products){
  return products.find(item => item.id === id);
}