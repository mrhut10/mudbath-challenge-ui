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
  <ul className="flex flex-wrap bg-green-200 justify-center">
    {children.map((child) => {
      const childKey = child.props.id
      return (
        <div key={childKey} className="w-full sm:w-1/2 md:w-1/3 p-2 my-2 relative">
          <div
            key={childKey}
            className="inline-block w-full border-2"
            onClick={
              !!toogleChild && typeof toogleChild === 'function'
              ? ()=>toogleChild(Number(childKey))
              : undefined
            }
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