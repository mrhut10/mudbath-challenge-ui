import React, { ReactNode } from 'react';
import Header from './header';
import Logo from './logo'

interface layoutProps {
  children: ReactNode
  MenuItems: ReactNode
}

const Layout = ({children, MenuItems}) => (
  <div className="bg-mainbg font-mono text-dark relative">
    <Header
      title={<Logo includeByMudBath/>}
      children={MenuItems}
    />
    {children}
  </div>
)

export default Layout;