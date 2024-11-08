import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import BreadCrumbs from '../components/BreadCrumbs'
import ProductFilter from '../components/ProductsFilter'
import { FirebaseContext, Product } from '../api/FirebaseContext'

const ShopWoman: React.FC = () => {
  const [ shopPageType, setShopPageType ]  = useState<string>("");
  const products: Product[] = useContext<Product[]>(FirebaseContext);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const shopProductType = "WOMAN";

  useEffect(() => {
    const filtered = products.filter( product => product.item.type === shopProductType);
    setFilteredProducts(filtered);
    setShopPageType(shopProductType);
  }, [products])

  return (
    <>
      <Header />
      <div className='px-7 sm:px-14 xl:px-24'> <BreadCrumbs shopPageType={shopPageType} /> </div>
      <div className='mt-2 px-7 sm:px-14 xl:px-24'> <ProductFilter products={filteredProducts} /> </div>
    </>
  )
}

export default ShopWoman