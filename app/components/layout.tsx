import React, { ReactNode } from 'react';
import Header from './header';

interface layoutProps {
  children: ReactNode
  MenuItems: ReactNode
}

const Layout = ({children, MenuItems}) => (
  <div className="bg-mainbg font-mono text-dark">
    <Header
      title={
        <div className="capitalize font-bold">
          <span className="tracking-tighter">
            XYZ
          </span>
          <span className="mx-3 text-deemphgrey">by</span>
          <span>Mudbath</span>
        </div>
      }
      children={MenuItems}
    />
    {children}
  </div>
)

export default Layout;