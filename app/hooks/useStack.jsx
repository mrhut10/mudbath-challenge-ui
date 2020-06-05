import React, {useState} from 'react'


function useStack(){
  const [allValues, setAllValues] = useState([]);
  const endValue = allValues.length > 0 ? allValues[allValues.length - 1] : undefined;
  const addValue = (newValue) => setAllValues([...allValues, newValue]);
  const removeValues = (count=1) => setAllValues(allValues.slice(0, allValues.length - count));
  const dangerSetValues = setAllValues;
  return [allValues, endValue, addValue, removeValues, dangerSetValues];
}

export default useStack;