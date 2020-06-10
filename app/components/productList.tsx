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
  <ul className="flex flex-wrap">
    {children.map((child) => {
      const childKey = child.props.id
      const onClickHandler = !!toogleChild && typeof toogleChild === 'function'
        ? ()=> toogleChild(Number(childKey))
        : undefined

      return (
        <div key={childKey} className="w-full md:w-1/2 relative">
          <div
            className="inline-block w-full"
            onClick={onClickHandler}
          >
            {
              !!toogleChild && typeof toogleChild === 'function'
              ? (
                  <>
                    <Selectable
                      checked={
                        selectedKeys && !!selectedKeys.find(key => key == Number(childKey))
                      }
                    />
                    {child}
                  </>
              ) : (child)
            }
          </div>
        </div>
      )
    })}
  </ul>
)}

export default ProductList;