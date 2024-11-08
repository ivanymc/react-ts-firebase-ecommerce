import React, { createContext, useState, useEffect, ReactNode } from 'react';
import db from './FirebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

export interface Product {
  itemID: string;
  item: {
    name: string;
    category: string;
    type: string;
    color: string[];
    description: string;
    hasImage: boolean;
    imageUrl: string;
    priceOriginal: number;
    priceFinal: number;
    quantity: number;
    currencySymbol: string;
    newArrive: boolean;
    soldOut: boolean;
    rating: {
      rate: number;
      count: number;
    };
  };
}

// Define props interface for FirebaseProvider component
interface FirebaseProviderProps {
  children: ReactNode;
}

// Create Firebase context
export const FirebaseContext = createContext<Product[]>([]);

// FirebaseProvider component
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products-cloth'));
        const fetchedProducts: Product[] = [];
        querySnapshot.forEach((doc: DocumentData) => {
          const data = doc.data() as Product;
          fetchedProducts.push(data);
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <FirebaseContext.Provider value={products}>
      { children }
    </FirebaseContext.Provider>
  );
};
