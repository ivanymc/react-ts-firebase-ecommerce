import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../api/FirebaseContext';
import { AiOutlineHome } from '../assets/Icon';

interface BreadCrumbsProps {
  shopPageType: string
  product?: Product | undefined
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ( { shopPageType, product } ) => {
  const shopType = shopPageType.toLocaleLowerCase();

  return (
    <>
      <div className="text-sm breadcrumbs overflow-hidden">
        <ul>
          <li> <Link to="/"> <AiOutlineHome /> </Link> </li> 
          { shopPageType &&  <li> <Link to="/shop"> Shop </Link> </li> }

          { shopPageType && (shopPageType === "MAN" || shopPageType === "WOMAN") && 
            <li> <Link to={`/shop/${shopType}`}> <span className='first-letter:uppercase'> {shopType} </span> </Link> </li>
          }

          { shopPageType && shopPageType === "DETAILS" && product &&
            <>
              <li> <Link to={`/shop/${product.item.type}`}> <span className='first-letter:uppercase lowercase'> {product.item.type} </span> </Link> </li>
              <li> <Link to={`/shop/${product.itemID}`}> <span className='first-letter:uppercase'> {product.item.name} </span> </Link> </li>
            </>
          }
          
        </ul>
      </div>
    </>
  )
}

export default BreadCrumbs