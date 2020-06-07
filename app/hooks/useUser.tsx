import React, { useState } from 'react'

export type users = 'admin' | 'user'

type useUserInterface = [users, () => any, (a:users) => any]

function useUser():useUserInterface{
  const [state, setState] = useState('user') as [users, (a:users) => any];

  function toogleUser(){
    return state === 'admin' ? setState('user') : setState('admin');
  }
  return [state, toogleUser, setState]
}

export default useUser;
