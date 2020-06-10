import React, { ReactNode } from 'react'

interface TileProps {
  children: ReactNode
}

const Card = ({children}:TileProps) => (
  <div className="w-full">
    <div className="bg-cardbg rounded-lg shadow-card hover:border-2 hover:border-light">
      {children}
    </div>
  </div>
)

export default Card;