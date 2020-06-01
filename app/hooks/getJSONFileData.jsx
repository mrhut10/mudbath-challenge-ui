import React, { useState, useEffect } from 'react';

const getJSONFileData = (path, name, keyName) => {
  const [stateValue, setSateValue] = useState({
    status: 'downloading',
    data: [],
    selectedKey: null,
  });
  const itemByKey = key => stateValue.data.find(item => item[keyName] === key)
  const selectItemByKey = key => setSateValue({
    ...stateValue,
    selectedKey: key
  })
  const updateItemByKey = (key, newItem) => {
    const oldItemIndex = stateValue.data.findIndex(item => item[keyName] === key);
    const oldItem = stateValue.data[oldItemIndex];
    setSateValue({
      ...stateValue,
      data: stateValue.data.map((item, index) => index === oldItemIndex ? newItem : oldItem)
    })
  }
  useEffect(()=>{
    fetch(path)
    // as isn't a normal API, we have to force it to stream download the file
    .then(response => response.json())
    .then(value => {
      console.log(`${name} downloaded`, value);
      return value;
    })
    .then(value => setSateValue({
      status: 'downloaded',
      data: value,
      selected: null,
    }));
  }, [])
  return [stateValue, selectItemByKey, updateItemByKey];
}

export default getJSONFileData