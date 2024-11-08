import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductsFilter from '../components/ProductsFilter';
import BreadCrumbs from '../components/BreadCrumbs';
import { FirebaseContext, Product } from '../api/FirebaseContext';

const Shop: React.FC = () => {

  const products: Product[] = useContext<Product[]>(FirebaseContext);
  const [ shopPageType, setShopPageType ]  = useState<string>("");
  let shopProductType = "SHOP";

  useEffect(() => {
    setShopPageType(shopProductType);
  }, [products])
  
  return (
    <>
      <Header/>
      <div className='px-7 sm:px-14 xl:px-24'> <BreadCrumbs shopPageType={shopPageType} /> </div>
      <div className='mt-2 px-7 sm:px-14 xl:px-24'> <ProductsFilter products={products} /> </div>
    </>
  );
};

export default Shop;
