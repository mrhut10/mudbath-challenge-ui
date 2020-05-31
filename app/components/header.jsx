import React from 'react';

const Header = ({title}) => (
  <div className="flex w-full">
    <div className="flex-auto">
      {title}
    </div>
    <div className="flex-none w-64">
      {title}
    </div>
  </div>
)

export default Header;