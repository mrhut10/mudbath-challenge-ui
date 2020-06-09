import React, { ReactNode } from 'react';
import Line from './line'

interface HeaderProps {
  title: string | JSX.Element
  children: ReactNode
}

const Header = ({title, children}: HeaderProps) => (
  <>
    <div className="flex w-full justify-between items-center flex-wrap">
      <div className="px-4">
        {title}
      </div>
      <nav className="pr-4">
        {children}
      </nav>
    </div>
    <Line/>
  </>
)

export default Header;