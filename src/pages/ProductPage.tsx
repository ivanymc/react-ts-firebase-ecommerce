import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import BreadCrumbs from '../components/BreadCrumbs'
import { useParams } from 'react-router-dom';
import { FirebaseContext, Product } from '../api/FirebaseContext';
import ProductDetails from '../components/ProductDetails';

const ProductPage: React.FC = () => {
  const products: Product[] = useContext<Product[]>(FirebaseContext);
  const [product, setProduct]  = useState<Product | undefined>(undefined);
  const [shopPageType, setShopPageType]  = useState<string>("");
  const shopProductType = "DETAILS";
  const { itemID } = useParams();

  useEffect(() => {
    setShopPageType(shopProductType);
    setProduct(products.find(product => product.itemID === itemID ) );
  }, [products])

  return (
    <>
      <Header />
      <div className='px-7 sm:px-14 xl:px-24'> <BreadCrumbs shopPageType={shopPageType} product={product} /> </div>
      <div className='px-7 sm:px-14 xl:px-24 mt-2'> <ProductDetails product={product} /> </div>
    </>
  )
}

export default ProductPage