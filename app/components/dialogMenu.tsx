import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import Dialog from '@reach/dialog'
import Button from './button'
import Tooltip from './tooltip'
import { productDialogEdit, productDialogClose } from '../redux/actions'
import { findProductByID } from '../helpers/index'
import { productInterface, productState } from '../redux/reducers/products'
import { userNames } from '../redux/reducers/user'

interface DialogMenuProps {
  id: number
  allProducts: productInterface[]
  user: userNames,
  wholeStack: productState['productDialogState']
  showEdit?: boolean
  heading?: string
  productDialogEdit: (id:number, user: userNames) => void,
  productDialogClose: (count:number) => void
}

const DialogMenu = ({
  id,
  user,
  allProducts,
  wholeStack,
  showEdit = true,
  heading,
  productDialogEdit,
  productDialogClose,
}: DialogMenuProps) => (
  <div className="flex flex-col justify-between">
    {/* Title and Menu Buttons */}
    <div className="flex justify-between">
      <h2 className="m-2 text-xl">{heading}</h2>
      <div className="space-x-3 flex">
        {showEdit && (
          <Button
            onClick={() =>
              user === 'admin' &&
              productDialogEdit(id, user)
            }
            className={user === 'admin' ? 'my-2' : 'my-2 bg-disabled'}
            tooltip={user === 'admin' ? undefined : 'Login To Enable Editing'}
            disabled={user === 'user'}
          >
            Edit
          </Button>
        )}
        <Tooltip
          placement="bottom"
          tooltip="close"
          trigger="hover"
          hideArrow={false}
        >
          <button
            className="p-2 text-xl text-red-400 bg-transparent "
            onClick={() => productDialogClose(1)}
          >
            <span>X</span>
            <span className="sr-only">close</span>
          </button>
        </Tooltip>
      </div>
    </div>
    {/* Breadcrumbs Nav */}
    <div className="m-2 w-full flex flex-wrap">
      {
        
      wholeStack
        // not include last value & trim enough from front to keep under max number
        .filter((value, i, list) => {
          const maxItems = 4
          const reverseIndex = list.length - 1 - i
          return reverseIndex !== 0 && reverseIndex < maxItems
        })
        .map((value, i, list) => {
          const { name } = findProductByID(value.id, allProducts)
          return (
            <div
              key={`${value.id}:${value.type}:i=${i}`}
              onClick={() => productDialogClose(list.length - 1)}
              className="bg-cardbg hover:text-light ml-3 my-1"
            >
              {i === 0 ? '../' : '/'} {name} (
              {value.type === 'edit' ? 'Edit' : 'View'})
            </div>
          )
        })}
    </div>
  </div>
)

const mapStateToProps = state => ({
  allProducts: state.products.allProducts,
  user: state.user,
  wholeStack: state.products.productDialogState
})

export default connect(mapStateToProps, {productDialogEdit, productDialogClose})(DialogMenu)
