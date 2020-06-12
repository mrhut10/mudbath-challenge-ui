import React from 'react'
import Button from './button'
import Tooltip from './tooltip'
import {findProductByID} from '../helpers/index'
import {productInterface} from '../hooks/getAllProducts'
import {users} from '../hooks/useUser'
import {usePopupStateReturnInterface} from '../hooks/usePopupState'

interface DialogMenuProps {
  id: number
  allProducts: productInterface[]
  user: users
  popupState: usePopupStateReturnInterface
}

const DialogMenu = ({id, user, allProducts, popupState}:DialogMenuProps) => (
  <div className="flex flex-col justify-between">
    <div className="flex justify-between">
      <h2 className="m-2 text-xl">{name}</h2>
        <div className="space-x-3 flex">
          <Button
            onClick={()=>user === 'admin' && popupState.openProductEdit(allProducts, id, user)}
            className={user === 'admin' ? 'my-2' :'my-2 bg-disabled'}
            tooltip={user === 'admin' ? undefined : 'Login To Enable Editing'}
          >
            Edit
          </Button>
            <Tooltip placement="bottom" tooltip="close" trigger="hover" hideArrow={false}>
              <button
                className="p-2 text-xl text-red-400 bg-transparent "
                onClick={()=>popupState.closePopups(1)}
              >
                <span>X</span>
                <span className="sr-only">close</span>
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="m-5 w-full space-y-2 flex-wrap">
          {
            popupState.wholeStack
            .filter((value, i, list) => i !== list.length - 1)
            .map((value, i, list) => (
              <>
                <span
                  onClick={()=>popupState.closePopups(list.length - i)}
                  className="bg-cardbg hover:text-light">{findProductByID(value.id, allProducts).name} /
                </span>{' '}
              </>
          ))}
        </div>
      </div>
)

export default DialogMenu