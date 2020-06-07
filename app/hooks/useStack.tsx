import React, {useState} from 'react'
import { clampNumber } from '../helpers/index'

export interface useStackReturnInterface<T> {
  allValues: T[]
  lastValue: T
  addValue: (value:T) => void
  removeValues: (count?: Number) => void
  dangerSetValues: (values: T[]) => void
}

function useStack<T>():useStackReturnInterface<T> {
  const [allValues, setAllValues] = useState([]) as [T[], (a:T[]) => any];
  const lastValue = allValues.length > 0 ? allValues[allValues.length - 1] : undefined;
  const addValue = (newValue:T) => setAllValues([...allValues, newValue]);
  const removeValues = (count:number=1) => {
    const clampCount = clampNumber(0, allValues.length)(count);
    setAllValues(allValues.slice(0, allValues.length - clampCount))
  };
  const dangerSetValues = setAllValues;

  return {
    allValues,
    lastValue,
    addValue,
    removeValues,
    dangerSetValues
  };
}

export default useStack;