import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Product } from "../../api/FirebaseContext";

const initialState: BasketState = {
  basket: [],
};

interface BasketState {
  basket: BasketItem[];
}

export interface BasketItem {
  product: Product;
  quantity: number;
}

interface AddToBasketPayload {
  product: Product;
  quantity: number;
}

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<AddToBasketPayload>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.basket.find(item => item.product.itemID === product.itemID);

      if (existingItem) {
        existingItem.quantity += quantity;
        // todos ,get item and then update item
        localStorage.setItem('basket', JSON.stringify(state.basket));
        // toast.error("Product already exist", { toastId: productId });
        toast.info("Updated Product Quantity");
      } else {
        state.basket.push({ product, quantity });
        localStorage.setItem('basket', JSON.stringify(state.basket));
        toast.success("Added to Basket")
      }

    },
  },
  
});


export const { addToBasket } = basketSlice.actions;

export default basketSlice.reducer;