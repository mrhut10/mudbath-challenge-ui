import React from 'react';

const Header = ({title, children}) => (
  <div className="flex w-full flex-wrap">
    <div className="text-center w-full">
      {title}
    </div>
    <div className="w-full">
      {children}
    </div>
  </div>
)

export default Header;