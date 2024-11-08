import React from 'react';
import { Product } from '../api/FirebaseContext';

interface ProductDetailsProps {
  product: Product | undefined
}

const ProductDetails: React.FC<ProductDetailsProps> = ( { product } ) => {
  return (
    <>
      { product && 
         <div className="mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
           <div className="mb-4 md:mb-0">
             <img src={product.item.imageUrl} alt={product.item.name} className="w-full" />
             {product.item.hasImage && (
               <div className="flex justify-center mt-4 space-x-2">
                 <img
                   src={product.item.imageUrl}
                   alt="Product Thumbnail"
                   className="w-16 h-16 border border-gray-300"
                 />
               </div>
             )}
           </div>
           <div>
             <h1 className="text-2xl font-semibold mb-2">{product.item.name}</h1>
             <p className="text-lg text-gray-700 mb-2">
               {product.item.currencySymbol}
               {product.item.priceFinal.toFixed(2)}
             </p>
             <div className="flex items-center mb-4">
               <span className="text-yellow-500">{product.item.rating.rate} ★</span>
               <span className="ml-2 text-gray-600">({product.item.rating.count} reviews)</span>
             </div>
             {/* Color and Size selection commented out until functionality is implemented */}
             {/* <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
               <div className="flex space-x-2">
                 {product.item.color.map((color) => (
                   <button
                     key={color}
                     className={`w-8 h-8 border ${
                       selectedColor === color ? 'border-black' : 'border-gray-300'
                     }`}
                     style={{ backgroundColor: color }}
                     onClick={() => onColorChange(color)}
                   />
                 ))}
               </div>
             </div>
             <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
               <div className="flex space-x-2">
                 {product.item.availableSizes.map((size) => (
                   <button
                     key={size}
                     className={`px-4 py-2 border ${
                       selectedSize === size ? 'border-black' : 'border-gray-300'
                     } ${product.item.availableSizes.includes(size) ? '' : 'opacity-50 cursor-not-allowed'}`}
                     onClick={() => onSizeChange(size)}
                     disabled={!product.item.availableSizes.includes(size)}
                   >
                     {size}
                   </button>
                 ))}
               </div>
             </div> */}
             <button
               className="w-full py-2 bg-black text-white font-semibold rounded"
               disabled={product.item.soldOut}
             >
               {product.item.soldOut ? 'SOLD OUT' : 'ADD TO BAG'}
             </button>
           </div>
         </div>
       </div>
        }
    </>
  )
}

export default ProductDetails