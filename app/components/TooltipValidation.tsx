import React, { ReactNode, ReactElement } from 'react'
import Tooltip from './tooltip'

interface TooltipValidationProps {
  TooltipMessage: string
  NotValidMessage: string
  labelMessage: { message: string; id: string }
  children: ReactNode
  className?: string
}

const TooltipValidation = ({
  labelMessage,
  TooltipMessage,
  NotValidMessage,
  children,
  className: cn,
}: TooltipValidationProps) => (
  <div className={'w-full '}>
    <label htmlFor={labelMessage.id}>{labelMessage.message}</label>
    <br />
    <Tooltip
      hideArrow={false}
      trigger="hover"
      placement="bottom"
      tooltip={TooltipMessage}
    >
      <div className={'bg-white rounded-lg border-2 border-medium ' + cn}>
        {children}
      </div>
    </Tooltip>
    <div className={' w-full text-right h-4'}>{NotValidMessage}</div>
  </div>
)

export default TooltipValidation
