import React from 'react'
import useStack, { useStackReturnInterface } from './useStack'
import { users, clampNumber } from '../helpers/index'
import { productInterface } from './getAllProducts'

interface PopupItemInterface {
  type: 'productDetail' | 'productEdit'
  id: number
}

interface PopupJSONStateInterface
  extends useStackReturnInterface<PopupItemInterface> {}

export interface usePopupStateReturnInterface {
  currentValue: PopupItemInterface
  openProductDetails: (
    allProducts: productInterface[],
    id: productInterface['id'],
  ) => void | Error
  openProductEdit: (
    allProducts: productInterface[],
    id: productInterface['id'],
    user: users,
  ) => void | Error
  closePopups: (count: number) => void
  danerousProductIDChangeAndCloseWindow: (
    user: users,
    oldID: productInterface['id'],
    newID: productInterface['id'],
  ) => void | Error
  wholeStack: PopupItemInterface[]
}

const openProductDetails = ({ addValue }: PopupJSONStateInterface) => (
  allProducts: productInterface[],
  id: number,
) => {
  if (!allProducts.find((product) => product.id === id)) {
    return new Error("can't open popup to a product that doesn't exist")
  }

  return addValue({ type: 'productDetail', id })
}
const openProductEdit = ({ allValues, addValue }: PopupJSONStateInterface) => (
  allProducts: productInterface[],
  id: PopupItemInterface['id'],
  user: users,
) => {
  if (user !== 'admin') {
    throw new Error('Only admin user can edit')
    return
  }
  if (!allProducts.find((product) => product.id === id)) {
    throw new Error("can't open popup to a product that doesn't exist")
    return
  }

  return addValue({ type: 'productEdit', id })
}

const closePopups = ({ removeValues }: PopupJSONStateInterface) => removeValues
const danerousProductIDChangeAndCloseWindow = ({
  allValues,
  dangerSetValues,
}: PopupJSONStateInterface) => (
  user: users,
  oldID: PopupItemInterface['id'],
  newID: PopupItemInterface['id'],
) => {
  if (user !== 'admin') {
    throw new Error("only admin can change ID's in stack")
    return
  }

  if (allValues.find((product) => product.id === newID)) {
    throw new Error('newID already exists')
    return
  }

  dangerSetValues(
    allValues
      .slice(0, clampNumber(0, allValues.length - 1)(allValues.length - 2))
      .map((value) =>
        value.type === 'productDetail' || value.type === 'productEdit'
          ? { ...value, id: newID }
          : value,
      ),
  )
}

function usePopupState(): usePopupStateReturnInterface {
  const StackState: PopupJSONStateInterface = useStack<PopupItemInterface>()
  const { allValues, lastValue } = StackState

  return {
    currentValue: lastValue,
    openProductDetails: openProductDetails(StackState),
    openProductEdit: openProductEdit(StackState),
    closePopups: closePopups(StackState),
    danerousProductIDChangeAndCloseWindow: danerousProductIDChangeAndCloseWindow(
      StackState,
    ),
    wholeStack: allValues,
  }
}

export default usePopupState
