import React, { ReactElement, ReactChildren, ReactNode } from 'react'

interface OverlayProps {
  BgElement: ReactNode
  children: ReactNode
  [key:string]: any
}

const Overlay = ({BgElement, children, ...props}:OverlayProps) => (
  <div className={"relative " + props.className + " overflow-hidden rounded-t-lg"}>
    <div className="absolute w-full bg-cardbg">
      {BgElement}
    </div>
    <div className="absolute z-10 w-full">
      {children}
    </div>
  </div>
)

export default Overlay;
