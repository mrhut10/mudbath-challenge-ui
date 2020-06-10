import React, { ReactNode } from 'react';
import Line from './line'

interface HeaderProps {
  title: string | JSX.Element
  children: ReactNode
}

const Header = ({title, children}: HeaderProps) => (
  <>
    <div className="flex w-full justify-between items-center flex-wrap px-5">
      <div className="">
        {title}
      </div>
      <nav className="">
        {children}
      </nav>
    </div>
    <Line/>
  </>
)

export default Header;