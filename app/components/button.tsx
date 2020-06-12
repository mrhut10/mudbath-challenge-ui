import React, {ReactNode, MouseEventHandler, useState} from 'react'
import Tooltip from './tooltip'

interface ButtonProps {
  children: ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
  tooltip?: ReactNode
}

const Button = ({children, onClick, disabled, className:CN, tooltip}: ButtonProps) => {
  
  return (
    tooltip
    ? (
      <Tooltip placement="bottom" trigger="hover" tooltip={tooltip} hideArrow={false}>
        <button
          className={`rounded-lg ${!disabled ? 'bg-buttonbg' : 'bg-disabled text-cardbg'} py-px px-2 border-2 border-buttonbord hover:border-light ` + CN}
          onClick={onClick}
          type="button"
          disabled={disabled}
        >
          {children}
        </button>
      </Tooltip>
    ) : (
      <button
        className={`rounded-lg ${!disabled ? 'bg-buttonbg' : 'bg-disabled text-cardbg'} py-px px-2 border-2 border-buttonbord hover:border-light ` + CN}
        onClick={onClick}
        type="button"
        disabled={disabled}
      >
        {children}
      </button>
    )
  )
}

export default Button;
