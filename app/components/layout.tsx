import React, { JSXElementConstructor } from 'react';
import Header from './header';

interface layoutProps {
  children: JSX.ElementChildrenAttribute
  MenuItems: JSX.ElementChildrenAttribute
}

const Layout = ({children, MenuItems}) => (
  <div className="bg-green-600">
    <Header
      title={<div>XYZ Product System</div>}
      children={MenuItems}
    />
    {children}
  </div>
)

export default Layout;