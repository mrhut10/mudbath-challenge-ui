import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import {FaUserAstronaut, FaDollarSign} from 'react-icons/fa'
import { users } from '../hooks/useUser'
import { currencyStateInterface } from '../hooks/getAllCurrencies'
import Button from './button'

interface UserItemProps {
  user: users,
  toogleUser: ()=>void,
  setUser: (user: users)=>void
}

interface CurrencyItemProps {
  exchangeRates: currencyStateInterface,
  setCurrency: (a:currencyStateInterface["selectedKey"]) => void,
}

const UserItem = ({user, toogleUser, setUser}:UserItemProps) => {
  const alternativeUser = user === 'admin' ? 'user' : 'admin';
  return (
    <div className="p-2 relative">
      <Button onClick={()=>setUser(alternativeUser)}>
        <span className="font-bold">
        {user === 'admin' ? 'Log out' : 'Sign In'}
        </span>
      </Button>
      {/*
        this is if i want a dropdown menu later
        <ul className="fixed box-border w-full m-2 rounded-lg z-10 bg-mainbg border-2 border-buttonbord">
          <li>test</li>
        </ul>
       */}
    </div>
  )
}

const CurencyItem = ({exchangeRates, setCurrency}:CurrencyItemProps) => (
  <div className="p-2">
    <Popup
      on="click"
      mouseEnterDelay={0}
      mouseLeaveDelay={300}
      trigger={
        <div>
          <Button>
            <div className="font-bold">Currency</div>
          </Button>
        </div>
      }
    >
      <ul>
        {exchangeRates.data.map(
          rate => (
            <li key={rate.base} className="p-2">
              <Button onClick={()=>setCurrency(rate.base)}>
                Set To {rate.base}
              </Button>
            </li>
          )
        )}
      </ul>
    </Popup>
  </div>
);


const MenuItems = ({user, setUser, toogleUser, exchangeRates, setCurrency}) => {
  return (
    <div className="flex justify-center flex-0">
      <CurencyItem exchangeRates={exchangeRates} setCurrency={setCurrency} />
      <UserItem user={user} setUser={setUser} toogleUser={toogleUser}/>
    </div>
  )
}
export default MenuItems;
