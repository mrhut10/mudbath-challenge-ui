import React, {useState} from 'react'

export interface useStackReturnInterface<T> {
  allValues: T[]
  endValue: T
  addValue: (value:T) => void
  removeValues: (count: Number) => void
  dangerSetValues: (values: T[]) => void
}

function useStack<T>():useStackReturnInterface<T> {
  const [allValues, setAllValues] = useState([]);
  const endValue = allValues.length > 0 ? allValues[allValues.length - 1] : undefined;
  const addValue = (newValue) => setAllValues([...allValues, newValue]);
  const removeValues = (count=1) => setAllValues(allValues.slice(0, allValues.length - count));
  const dangerSetValues = setAllValues;
  return {
    allValues,
    endValue,
    addValue,
    removeValues,
    dangerSetValues
  };
}

export default useStack;