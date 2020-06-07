import React, { ReactNode } from 'react'

interface TileProps {
  children: ReactNode
}

const Tile = ({children}:TileProps) => (
  <div className="w-full">
    <div className="bg-white rounded-lg shadow hover:shadow-lg text-center">
      {children}
    </div>
  </div>
)

export default Tile;