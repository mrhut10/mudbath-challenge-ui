import React, { ReactElement } from 'react'
import Button from './button'
import Tooltip from './tooltip'
import {findProductByID} from '../helpers/index'
import {productInterface} from '../hooks/getAllProducts'
import {users} from '../hooks/useUser'
import {usePopupStateReturnInterface} from '../hooks/usePopupState'
import Dialog from '@reach/dialog'

interface DialogMenuProps {
  id: number
  allProducts: productInterface[]
  user: users
  popupState: usePopupStateReturnInterface
  showEdit?: boolean
}

const DialogMenu = ({id, user, allProducts, popupState, showEdit=true}:DialogMenuProps) => (
  <div className="flex flex-col justify-between">
    <div className="flex justify-between">
      <h2 className="m-2 text-xl">{name}</h2>
        <div className="space-x-3 flex">
          {
            showEdit &&
            <Button
              onClick={()=>user === 'admin' && popupState.openProductEdit(allProducts, id, user)}
              className={user === 'admin' ? 'my-2' :'my-2 bg-disabled'}
              tooltip={user === 'admin' ? undefined : 'Login To Enable Editing'}
            >
              Edit
            </Button>
          }
          
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
        <div className="m-2 w-full flex flex-wrap">
          {
            popupState.wholeStack
            // not include last value & trim enough from front to keep under max number
            .filter((value, i, list) => {
              const maxItems = 4;
              const reverseIndex = list.length - 1 - i;
              return (reverseIndex !== 0 && reverseIndex < maxItems)
            })
            .map((value, i, list) => {
              const { name } = findProductByID(value.id, allProducts);
              return (
                <div
                  key={`${value.id}:${value.type}:i=${i}`}
                  onClick={()=>popupState.closePopups(list.length - i)}
                  className="bg-cardbg hover:text-light ml-3 my-1"
                >
                  {i === 0 ? '../' : '/'} {name} ({value.type === 'productEdit' ? 'Edit' : 'View'})
                </div>
              )
            })
          }
        </div>
      </div>
)

export default DialogMenu