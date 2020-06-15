/**
 * credit to the example tooltip component in documentation
 * https://www.npmjs.com/package/react-popper-tooltip
 */

import React, { ReactNode } from 'react'
import TooltipTrigger from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'

interface TooltipProps {
  children: ReactNode
  tooltip: ReactNode
  trigger: 'none' | 'click' | 'right-click' | 'hover' | 'focus'
  placement:
    | 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start'
  hideArrow: boolean
}

const Tooltip = ({ children, tooltip, hideArrow, ...props }: TooltipProps) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement,
    }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container',
        })}
      >
        {!hideArrow && (
          <div
            {...getArrowProps({
              ref: arrowRef,
              className: 'tooltip-arrow',
              'data-placement': placement,
            })}
          />
        )}
        {tooltip}
      </div>
    )}
  >
    {({ getTriggerProps, triggerRef }) => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: 'trigger',
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
)

export default Tooltip
