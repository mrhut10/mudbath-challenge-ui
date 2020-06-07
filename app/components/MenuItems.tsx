import React from 'react'
import Popup from 'reactjs-popup'
import {FaUserAstronaut, FaDollarSign} from 'react-icons/fa'
import { users } from '../hooks/useUser'
import { currencyStateInterface } from '../hooks/getAllCurrencies'
// untyped dependencies

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
    <div className="w-1/2 p-8">
      <Popup
        trigger={
          <button
            className="w-full rounded-lg bg-red-200 p-2"
          >
            <FaUserAstronaut className="mx-auto"/>
            <span className="font-bold">{user}</span>
          </button>
        }
        on="hover"
        mouseLeaveDelay={300}
        mouseEnterDelay={0}
      >
          <button
            onClick={()=>setUser(alternativeUser)}
            className="w-full rounded-lg bg-red-200 p-2"
          >
            <FaUserAstronaut className="mx-auto"/>
            <span className="font-bold">Login As {alternativeUser}</span>
          </button>
      </Popup>
    </div>
  )
}

const CurencyItem = ({exchangeRates, setCurrency}:CurrencyItemProps) => (
  <div className="w-1/2 p-8">
    <Popup
      on="hover"
      mouseEnterDelay={0}
      mouseLeaveDelay={300}
      trigger={
        <button className="w-full rounded-lg bg-red-200 p-2">
          <div className="font-bold">Selected Currency</div>
          <div className="font-bold">
            {exchangeRates.status !== 'downloading' ? exchangeRates.selectedKey : 'LOADING'}
          </div>
        </button>
      }
    >
      <ul>
        {exchangeRates.data.map(
          rate => (
            <li key={rate.base} className="p-3">
              <button
                className="w-full rounded-lg bg-red-200 p-2"
                onClick={()=>setCurrency(rate.base)}
              >
                Set To {rate.base}
              </button>
            </li>
          )
        )}
      </ul>
    </Popup>
  </div>
);


const MenuItems = ({user, setUser, toogleUser, exchangeRates, setCurrency}) => {
  return (
    <div className="w-full flex justify-center text-center">
      <UserItem user={user} setUser={setUser} toogleUser={toogleUser}/>
      <CurencyItem exchangeRates={exchangeRates} setCurrency={setCurrency} />
    </div>
  )
}
export default MenuItems;
