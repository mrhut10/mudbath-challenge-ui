import React, { useEffect } from 'react'
import { SHA256, enc } from 'crypto-js'
import getJSONFileData from './getJSONFileData'
import { users } from './useUser'

export interface productInterface {
  id: number
  name: string
  description: string
  price: {
    base: string
    amount: number
  }
  relatedProducts: number[]
  photo?: string
}

const products_file_url = '/products.json'

const getAllProducts = () => {
  const {
    stateValue: allProducts,
    selectItemByKey,
    danerouslySetAllValues,
  } = getJSONFileData<productInterface, 'id'>(
    products_file_url,
    'products',
    'id',
  )
  useEffect(() => {
    // this will provide a photo for each product
    const productDataWithPhoto = allProducts.data.map((product) => {
      const seed = SHA256(JSON.stringify(product)).toString()
      return {
        ...product,
        photo: `https://picsum.photos/seed/${seed}/200`,
      }
    })
    danerouslySetAllValues({ ...allProducts, data: productDataWithPhoto })
  }, [allProducts.status])

  function updateProductByKey(
    keyValue: productInterface['id'],
    newDefinition: productInterface,
    user: users,
  ) {
    // only allow admin to edit
    if (user !== 'admin') {
      throw new Error('must be admin to update Product')
    }

    const newState: productInterface[] = allProducts.data.map<productInterface>(
      (product) => {
        if (product.id === keyValue) {
          // is the product that's changing
          return { ...product, ...newDefinition }
        }

        if (product.relatedProducts.includes(keyValue)) {
          // relates to changing product
          return {
            ...product,
            relatedProducts: product.relatedProducts.map((value) =>
              value === keyValue ? newDefinition.id : value,
            ),
          }
        }

        // unrelated product
        return product
      },
    )

    danerouslySetAllValues({ ...allProducts, data: newState })
  }
  return { allProducts, selectItemByKey, updateProductByKey }
}

export default getAllProducts
