import React, { ReactNode, ReactElement } from 'react'
import Tooltip from './tooltip'

interface TooltipValidationProps {
  TooltipMessage: string
  NotValidMessage: string
  labelMessage: {message:string, id:string}
  children: ReactElement
}

const TooltipValidation = ({labelMessage, TooltipMessage, NotValidMessage, children}:TooltipValidationProps) => (
  <div>
    <label htmlFor={labelMessage.id}>{labelMessage.message}</label>
    <Tooltip hideArrow={false} trigger="hover" placement="bottom" tooltip={TooltipMessage}>
      {children}
    </Tooltip>
    <span className={NotValidMessage ? 'visible' : 'invisible'}>{NotValidMessage}</span>
  </div>

)


export default TooltipValidation