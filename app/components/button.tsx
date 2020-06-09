import React, {ReactNode, MouseEventHandler} from 'react'

interface ButtonProps {
  children: ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

const Button = ({children, onClick, disabled}: ButtonProps) => (
  <button disabled={disabled} className={`rounded-lg ${!disabled ? 'bg-buttonbg' : 'bg-disabled text-cardbg'} p-2 border-2 border-buttonbord hover:border-light`} onClick={onClick}>
    {children}
  </button>
)

export default Button;
