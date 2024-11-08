import React, { useEffect, useState } from 'react';
import { Product } from '../api/FirebaseContext';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from '../assets/Icon';
import { Link } from 'react-router-dom';
import { FilterState } from './ProductsFilter';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addToBasket } from '../redux/basket/basketSlicer';

interface ProductFilterProps {
  products: Product[]
  sortingBy: string
  filterBy: FilterState[]
}

const ShoppingList: React.FC<ProductFilterProps> = ({ products, sortingBy, filterBy }) => {
  const [filterOrSortedProducts, setFilterOrSortedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    products ? setIsLoading(false) : null
  }, [products]);
  
  // Filter then sorting
  useEffect(() => {
    let filteredProducts: Product[] = [...products];
    if (filterBy.length > 0) {
      filterBy.forEach( filter => {
        if (filter.filterMethod === "PRICE" && (filter.minPrice || filter.minPrice === 0) && filter.maxPrice) {
          filteredProducts = filterProductsByPrice( filteredProducts || [products], filter.minPrice, filter.maxPrice );
        }
        if (filter.filterMethod === "COLOR" && filter.color && filter.color.length > 0) {
          // should add here, if no products availialbe for some color, filter options should hide
          filteredProducts = filterProductsByColor( filteredProducts || [products], filter.color );
        }
        if (filter.filterMethod === "CATEGORY" && filter.category && filter.category.length > 0) {
          // should add here, if no products availialbe for some CATEGORY, filter options should hide
          filteredProducts = filterProductsByCategory( filteredProducts || [products], filter.category );
        }
        if (filter.filterMethod === "FEATURES" && filter.feature) {
          filteredProducts = filterProductsByFeatures( filteredProducts || [products], filter.feature );
        }
      })
    };
  
    let sortedProducts = [...filteredProducts];
    if (sortingBy === "Lowest Price") {
      sortedProducts = sortedProducts.sort( (a, b) => a.item.priceFinal - b.item.priceFinal );
    } else if (sortingBy === "Highest Price") {
      sortedProducts = sortedProducts.sort( (a, b) => b.item.priceFinal - a.item.priceFinal );
    } else if (sortingBy === "Rating") {
      sortedProducts = sortedProducts.sort( (a, b) => b.item.rating.rate - a.item.rating.rate );
    }
  
    setFilterOrSortedProducts(sortedProducts);

  }, [products, sortingBy, filterBy]);
  

  // Save to wishlist
  const [wishListItems, setWishListItems] = useState<string[]>([]);
  const saveToWiseList = (e: React.MouseEvent<HTMLDivElement>, itemID: string) => {
    e.preventDefault();
    setWishListItems(prevState => {
      let newState = prevState.includes(itemID) ? prevState.filter(id => id !== itemID) : [...prevState, itemID];
      return newState;
    });
  };

  // Add to Basket
  const handleAddToBasket = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    dispatch( addToBasket( { product, quantity: 1 } ) );
    // dispatch( addToBasket( { productId, quantity: e.target.value || 1 } ) );
  };

  // Filter
  function filterProductsByPrice(products: Product[], minPrice?: number, maxPrice?: number): Product[] {
    return products.filter(product => {
      let productPrice = product.item.priceFinal;
      if ( (minPrice || minPrice === 0) && maxPrice) {
        return productPrice >= minPrice && productPrice <= maxPrice;
      }
    });
  }

  function filterProductsByColor(products: Product[], color?: string[]): Product[] {
    return products.filter(product => {
        let productColorArray = product.item.color;
        if (color && color.length > 0) {
          return color.some(color => productColorArray.includes(color));
        }
    });
  }
  
  function filterProductsByCategory(products: Product[], category?: string[]): Product[] {
    return products.filter(product => {
        let productCategory = product.item.category;
        if (category && category.length > 0) {
          return category.some(cat => cat === productCategory);
        }
    });
  }

  function filterProductsByFeatures(products: Product[], feature?: string): Product[] {
    return products.filter(product => {
      let newArrive = product.item.newArrive;
      if ( feature === "New Arrivals" && newArrive) {
        return product;
      }
    });
  }

  // console.log(filterOrSortedProducts);


  return (
    <>
    {/* {filterOrSortedProducts.length} */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 xl:gap-x-10 gap-y-8">
        { !isLoading && filterOrSortedProducts && filterOrSortedProducts.map(product => (
          <div key={product.itemID} className="relative transition duration-500 ease-in-out transform hover:scale-105 group">
            <Link to={`/shop/${product.itemID}`}  >
              <div className="relative w-full h-5/6">
                <img src={product.item.imageUrl} loading='lazy' alt={product.item.name} className="w-full h-full object-cover rounded-xl" />
                { product.item.newArrive && <div className='absolute top-2 left-2 badge badge-xs badge-neutral p-0 px-2 py-3 '> NEW </div> }

                <div className="absolute bottom-3 w-full ">
                  <button onClick={ e => handleAddToBasket(e, product) } id={`addToBasket-${product.itemID}`} className="btn btn-block btn-neutral opacity-0 group-hover:opacity-100 transition-opacity duration-200" >
                     <AiOutlineShoppingCart /> <span> Add to Bag </span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs md:text-sm font-semibold tracking-tight uppercase line-clamp-2"> {product.item.name} </span>
                <div>
                  <span className='line-through text-gray-400 text-xs'> {product.item.currencySymbol}{product.item.priceOriginal} </span>
                  <span className='ml-1 text-red-600'> {product.item.currencySymbol}{product.item.priceFinal} </span>
                </div>
                
              </div> 

              <div id={`saveToWiseList-${product.itemID}`} className='absolute top-2 right-2' onClick={e => saveToWiseList(e, product.itemID)} >
                { wishListItems.includes(product.itemID) 
                  ? <AiFillHeart className='size-6 sm:size-7 xl:size-8 text-red-500 cursor-pointer' />
                  : <AiOutlineHeart className='size-6 sm:size-7 xl:size-8 text-white cursor-pointer hover:text-red-500' /> }
              </div>
            </Link>
          </div>
        )) }

        { isLoading && 
          <>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
            <div className="skeleton w-32 h-48 md:w-48 md:h-60 xl:w-60 xl:h-80" ></div>
          </>
        }

        { filterOrSortedProducts.length === 0 && <div> No Product Found. </div>}


      </div>
    </>
  )
}

export default ShoppingList



