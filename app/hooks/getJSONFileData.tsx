import React, { useState, useEffect } from 'react';

export interface JSONFileState<T, K extends keyof T> {
  status: 'downloading' | 'downloaded'
  key: K
  selectedKey: T[K] | undefined
  data: T[]
}


function getJSONFileData<T, K extends keyof T>(path:string, name:string, keyName:K){
  const initialState:JSONFileState<T, K> = {
    status: 'downloading',
    key: keyName,
    selectedKey: undefined,
    data: [],
  }
  const [stateValue, setSateValue] = useState(initialState) as [JSONFileState<T, K>, (a:JSONFileState<T, K>) => any];

  const itemByKeyValue = (keyValue:T[K]):T => stateValue.data.find(item => item[keyName] === keyValue)
  
  function selectItemByKey(keyValue:T[K]) {
    if (!itemByKeyValue(keyValue)){
      // item doesn't exist
      throw Error("can't select an item that doesn't exist")
    }

    return setSateValue({
      ...stateValue,
      selectedKey: keyValue
    })
  }

  const updateItemByKey = (keyValue:T[K], newItem:T) => {
    const oldItemIndex = stateValue.data.findIndex(item => item[keyName] === keyValue);
    const oldItem = stateValue.data[oldItemIndex];

    // item must exist
    if (!oldItem){
      throw new Error("Item Must Exist to Update It");
    }

    // prevent id conflicts
    if (
      keyValue !== newItem[keyName] &&
      stateValue.data.find(item => item[keyName] === newItem[keyName])
    ) {
      // id is getting change and will be a conflict
      throw new Error("can't change as will create conflict of multiple items with same id");
    }

    return setSateValue({
      ...stateValue,
      data: stateValue.data.map((item, index) => index === oldItemIndex ? newItem : item)
    })
  }

  useEffect(()=>{
    fetch(path)
    // as isn't a normal API, we have to force it to stream download the file
    .then(response => response.json())
    .then(value => {
      // log downloaded 
      console.log(`${name} downloaded`, value);
      // cast value into array of T
      return value as T[];
    })
    .then(values => setSateValue({
      status: 'downloaded',
      data: values,
      key: keyName,
      selectedKey: undefined
    }));
  }, [])
  return {
    stateValue, selectItemByKey, danerouslySetAllValues: setSateValue
  };
}

export default getJSONFileData