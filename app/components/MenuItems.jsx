import React from 'react'
import {FaUserAstronaut, FaDollarSign} from 'react-icons/fa'

const UserItem = ({user, setUser}) => {
  const alternativeUser = user === 'admin' ? 'user' : 'admin';
  return (
    <div className="w-1/2 p-8">
      <button
        className="w-full rounded-lg bg-red-200 p-2"
        onClick={()=>setUser(alternativeUser)}
      >
          <FaUserAstronaut className="mx-auto"/>
          <span className="font-bold rounded">{user}</span>
      </button>
    </div>
  )
}

const CurencyItem = ({exchangeRates, openCurrency}) => (
  <div className="w-1/2 p-8">
    <button
      className="bg-red-200 p-2 rounded-lg w-full"
      onClick={openCurrency}
    >
      <FaDollarSign className="mx-auto"/>
      <span className="font-bold">AUD</span>
    </button>
  </div>
);


const MenuItems = ({user, setUser, exchangeRates, openCurrency}) => {
  return (
    <div className="w-full flex justify-center text-center">
      <CurencyItem exchangeRates={exchangeRates} openCurrency={openCurrency} />
      <UserItem user={user} setUser={setUser} />
    </div>
  )
}
export default MenuItems;
