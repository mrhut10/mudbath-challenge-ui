import React, {ReactNode, MouseEventHandler} from 'react'

interface ButtonProps {
  children: ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
}

const Button = ({children, onClick, disabled, className:CN}: ButtonProps) => (
  <button disabled={disabled} className={`rounded-lg ${!disabled ? 'bg-buttonbg' : 'bg-disabled text-cardbg'} py-px px-2 border-2 border-buttonbord hover:border-light ` + CN} onClick={onClick}>
    {children}
  </button>
)

export default Button;
