import { TCartData } from "@/hooks/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TCartData[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<TCartData[]>) => {
      return [...state, ...action.payload];
    },
    updateCart: (state, action: PayloadAction<TCartData>) => {
      const update = action.payload;

      return state.map((cart) =>
        cart.productId === update.productId ? update : cart
      );
    },
    deleteCart: (state, action: PayloadAction<TCartData["productId"]>) => {
      const productId = action.payload;
      return state.filter((cart) => cart.productId !== productId);
    },
  },
});

export const { addCart, updateCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;
