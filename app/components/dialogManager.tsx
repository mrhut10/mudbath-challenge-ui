import React from 'react'
import { connect } from 'react-redux'
import { DialogOverlay } from '@reach/dialog'
import '@reach/dialog/styles.css'
import { last } from '../helpers/index'
import DialogContentDetails from './DialogContentDetails'
import DialogContentEdit from './DialogContentEdit'
import { productState } from '../redux/reducers/products'

interface PopupManagerProps {
  dialogState: productState['productDialogState']
}

const PopupManager = ({ dialogState }: PopupManagerProps) => {
  const currentValue = last(dialogState)

  return (
    <DialogOverlay isOpen={!!currentValue}>
      <div className="max-w-3xl mx-auto bg-cardbg box-border mt-32 xsm:mt-20 m-10 z-50">
        {!currentValue ? undefined : currentValue.type === 'edit' ? (
          <DialogContentEdit id={currentValue.id} />
        ) : (
          <DialogContentDetails id={currentValue.id} />
        )}
      </div>
    </DialogOverlay>
  )
}

const stateToProps = (state) => ({
  dialogState: state.products.productDialogState,
})

export default connect(stateToProps)(PopupManager)
