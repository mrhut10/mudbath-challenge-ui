import React, { ReactElement } from 'react';
import { productInterface } from '../hooks/getAllProducts'
import Selectable from './selectable';

interface ProductListProps {
  children?: ReactElement[]
  selectedKeys?:productInterface["id"][]
  toogleChild?:(id:productInterface["id"]) => void
}

const ProductList = ({children, selectedKeys=[], toogleChild=undefined}:ProductListProps) => {
  return (
  <ul className="flex flex-wrap justify-center -ml-10 p-10 md:p-5">
    {children.map((child, i) => {
      const childKey = child.props.id
      const onClickHandler = !!toogleChild && typeof toogleChild === 'function'
        ? ()=> toogleChild(Number(childKey))
        : undefined

      return (
        <div key={i} className="box-border w-full lg:w-1/2 max-w-2xl pl-10 relative">
          <div
            className="w-full"
            onClick={onClickHandler}
          >
            {child}
          </div>
        </div>
      )
    })}
  </ul>
)}

export default ProductList;