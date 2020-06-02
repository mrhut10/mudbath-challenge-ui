import React, {useState} from 'react'


function useStack(){
  const [allValues, setAllValues] = useState([]);
  const endValue = allValues.length > 0 ? allValues[allValues.length - 1] : undefined;
  const addValue = (newValue) => setAllValues([...allValues, newValue]);
  const removeValue = () => allValues.slice(0, allValues.length - 1);
  const dangerSetValues = setAllValues;
  return [allValues, endValue, addValue, removeValue, dangerSetValues];
}

export default useStack;