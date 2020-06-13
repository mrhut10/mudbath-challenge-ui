import React, {ReactNode, MouseEventHandler, useState, ReactElement} from 'react'
import Tooltip from './tooltip'

interface ButtonProps {
  children: ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
  tooltip?: ReactNode
}

const Button = ({children, onClick, disabled, className:CN, tooltip}: ButtonProps) => {

  const WithoutTooltip = ({children}):ReactElement => (
    <button
      className={
        "rounded-lg py-px px-2 border-2 border-buttonbord hover:border-light " +
          (!disabled ? 'bg-buttonbg ' : 'bg-disabled text-cardbg ') + CN
      }
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  )
  
  return (
    <Tooltip placement="bottom-end" trigger={tooltip ? 'hover' : 'none'} tooltip={tooltip} hideArrow={false}>
        <WithoutTooltip>{children}</WithoutTooltip>
    </Tooltip>
  )
}

export default Button;
