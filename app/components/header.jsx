import React from 'react';

const Header = ({title, children}) => (
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