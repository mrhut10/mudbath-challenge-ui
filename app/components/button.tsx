import React, { ReactNode, ReactElement, ButtonHTMLAttributes } from 'react'
import Tooltip from './tooltip'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  tooltip?: ReactNode
}

const Button = ({
  children,
  onClick,
  className: CN,
  tooltip,
  disabled = false,
  type = 'button',
  ...props
}: ButtonProps) => {
  const WithoutTooltip = ({ children }): ReactElement => (
    <button
      className={
        'rounded-lg py-px px-2 border-2 border-buttonbord hover:border-light ' +
        (!disabled ? 'bg-buttonbg ' : 'opacity-50 cursor-not-allowed ') +
        CN
      }
      onClick={!disabled ? onClick : undefined}
      type={type}
      {...props}
    >
      {children}
    </button>
  )

  return (
    <Tooltip
      placement="bottom-end"
      trigger={tooltip ? 'hover' : 'none'}
      tooltip={tooltip}
      hideArrow={false}
    >
      <WithoutTooltip>{children}</WithoutTooltip>
    </Tooltip>
  )
}

export default Button
