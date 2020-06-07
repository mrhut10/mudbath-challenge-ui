import React, { useState, ReactElement } from 'react';
import {productInterface} from '../hooks/getAllProducts'
import Selectable from './selectable';

interface ProductListProps {
  children?: ReactElement[]
  selectedKeys?:productInterface["id"][]
  toogleChild?:(id:productInterface["id"]) => void
}

const ProductList = ({children, selectedKeys=[], toogleChild=undefined}:ProductListProps) => {
  return (
  <ul className="flex flex-wrap bg-green-200 justify-center">
    {children.map(child => (
      <div key={child.key} className="w-full sm:w-1/2 md:w-1/3 p-2 my-2 relative">
        <div
          key={child.key}
          className="inline-block w-full border-2"
          onClick={
            !!toogleChild && typeof toogleChild === 'function'
            ? ()=>toogleChild(Number(child.key))
            : undefined
          }>
          {
            !!toogleChild && typeof toogleChild === 'function'
            ? (
              <Selectable
                checked={selectedKeys && !!selectedKeys.find(key => key === child.key)}
                onClick={()=>{toogleChild(Number(child.key))}}
              />
            ) : (undefined)
          }
          {child}
        </div>
      </div>
    ))}
  </ul>
)}

export default ProductList;