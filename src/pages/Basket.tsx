import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FirebaseContext, Product } from '../api/FirebaseContext';

const Basket: React.FC = () => {

  const basketItems = useSelector((state: RootState) => state.basket.basket);
  const products: Product[] = useContext<Product[]>(FirebaseContext);
  const [filteredProducts, setFilteredProducts] = useState<{ product: Product, quantity: number }[]>([]);

  // think of local storage
  // useEffect(() => {
  //   // Load basket state from localStorage
  //   const basketStateFromLocalStorage = localStorage.getItem("basket");
  //   if (basketStateFromLocalStorage) { 
  //     const basketItemsFromLocalStorage: { product: Product; quantity: number }[] = JSON.parse(basketStateFromLocalStorage);
  //     console.log("basketItemsFromLocalStorage", basketItemsFromLocalStorage)
  //     const filtered = basketItemsFromLocalStorage.map(item => {
  //       const product = products.find(product => product.itemID === item.product.itemID);
  //       return product ? { product, quantity: item.quantity } : null;
  //     }).filter(item => item !== null) as { product: Product, quantity: number }[];
  //     console.log("filtered", filtered)
  //     setFilteredProducts(filtered);
  //   }
  // }, [basketItems, products ]); // Ensure useEffect runs whenever products change

  useEffect(() => {
    const filtered = basketItems.map(item => {
      const product = products.find(product => product.itemID === item.product.itemID);
      return product ? { product, quantity: item.quantity } : null;
    }).filter(item => item !== null) as { product: Product, quantity: number }[];
    
    setFilteredProducts(filtered);
  }, [basketItems, products]);


  const incrementQuantity = (index: number) => {
    console.log("incrementQuantity", index);
    const updatedProducts = [...filteredProducts];
    updatedProducts[index].quantity++;
    setFilteredProducts(updatedProducts);
  };
  
  const decrementQuantity = (index: number) => {
    const updatedProducts = [...filteredProducts];
    console.log("decrementQuantity", index, updatedProducts[index].quantity);
      updatedProducts[index].quantity--;
      setFilteredProducts(updatedProducts);

     if (updatedProducts[index].quantity < 1 ) {
      const filteredWithoutRemoved = updatedProducts.filter( (_, product) => product !== index);
      setFilteredProducts(filteredWithoutRemoved);
      // need to update the basketSlicer also
    }
  };
 

  return (
    <>
      <Header />    

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold  sm:text-3xl">Your Bag</h1>
            </header>
            <div className="mt-8">
              <ul className="space-y-4">

                { filteredProducts && filteredProducts.map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <img src={item.product.item.imageUrl} alt={item.product.item.name} className="size-16 rounded object-cover" />
                    <div>
                      <h3 className="text-sm"> {item.product.item.name} </h3>
                      <dl className="mt-0.5 space-y-px text-[10px] ">
                        <div>
                          <dt className="inline">Color: </dt>
                          <dd className="inline"> {item.product.item.color} </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <button type="button" onClick={() => decrementQuantity(index)} className="h-8 w-8" > - </button>
                        <input type="number" min="0" value={item.quantity} id="Line1Qty" className="h-8 w-12 rounded p-0 text-center text-xs text-gray-800 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />
                        <button type="button" onClick={() => incrementQuantity(index)} className="h-8 w-8" > + </button>
                      </form>

                      <button className="transition hover:text-red-600 ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </li>

                )) }

                { filteredProducts.length === 0 && <div> Add Products into Bag </div>}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm ">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>£250</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>£25</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>-£20</dd>
                    </div>
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>£200</dd>
                    </div>
                  </dl>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center justify-center rounded-full ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="-ms-1 me-1.5 h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                      </svg>
                      <p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <a href="#" className="block rounded bg-gray-700 px-5 py-3 text-sm  transition hover:bg-gray-600"> Checkout </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Basket;