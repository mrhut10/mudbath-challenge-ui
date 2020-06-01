import React from 'react';
import Header from './header';

const Layout = ({children}) => (
  <div className="bg-green-600">
    <Header title={<div>hello</div>}/>
    {children}
  </div>
)

export default Layout;