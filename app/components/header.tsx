import React, { ReactNode } from 'react';

interface HeaderProps {
  title: string | JSX.Element
  children: ReactNode
}

const Header = ({title, children}: HeaderProps) => (
  <div className="flex w-full flex-wrap">
    <div className="text-center w-full">
      {title}
    </div>
    <nav className="w-full">
      {children}
    </nav>
  </div>
)

export default Header;