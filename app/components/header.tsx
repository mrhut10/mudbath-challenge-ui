import React, { ReactNode } from 'react';
import Line from './line'

interface HeaderProps {
  title: string | JSX.Element
  children: ReactNode
  className?: string,
}

const Header = ({title, children, className}: HeaderProps) => (
  <div className="sticky top-0 w-full z-10 bg-mainbg">
    <div className={`flex w-full justify-between items-center flex-wrap px-5 ${className}`}>
      <div>
        {title}
      </div>
      <nav className="">
        {children}
      </nav>
    </div>
    <Line/>
  </div>
)

export default Header;