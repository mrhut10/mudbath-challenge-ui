import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login, currencySelect } from '../redux/actions'
import { currenciesState } from '../redux/reducers/currencies'
import { userNames } from '../redux/reducers/user'

import Popup from 'reactjs-popup'
import Button from './button'

interface UserItemProps {
  user: userNames
  toogleUser: () => void
  setUser: (user: userNames) => void
}

interface CurrencyItemProps {
  exchangeRates: currenciesState
  setCurrency: (a: currenciesState['selected']) => void
}

const UserItem = ({ user, toogleUser, setUser }: UserItemProps) => {
  const alternativeUser = user === 'admin' ? 'user' : 'admin'
  return (
    <div className="p-3">
      <a
        className="text-shadow-link font-bold hover:text-light"
        onClick={() => setUser(alternativeUser)}
      >
        {user === 'admin' ? 'Log out' : 'Sign In'}
      </a>
    </div>
  )
}

const CurencyItem = ({ exchangeRates, setCurrency }: CurrencyItemProps) => (
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
        {exchangeRates.allCurrencies.map((rate) => (
          <li key={rate.base} className="p-2">
            <Button onClick={() => setCurrency(rate.base)}>
              Set To {rate.base}
            </Button>
          </li>
        ))}
      </ul>
    </Popup>
  </div>
)

const MenuItems = ({
  user,
  currencies,
  login,
  currencySelect,
  toogleUser = () => (user === 'admin' ? login('user') : login('admin')),
}) => {
  return (
    <div className="flex justify-center flex-0">
      <CurencyItem exchangeRates={currencies} setCurrency={currencySelect} />
      <UserItem user={user} setUser={login} toogleUser={toogleUser} />
    </div>
  )
}

const mapStateToProps = (state) => {
  const { user, currencies } = state
  return {
    user,
    currencies,
  }
}
export default connect(mapStateToProps, { login, currencySelect })(MenuItems)
