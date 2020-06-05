export function findExchangeRate (base, target, exchangeRates) {
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

export function findProductByID(id, products){
  return products ? products.find(item => item.id === id) : undefined;
}