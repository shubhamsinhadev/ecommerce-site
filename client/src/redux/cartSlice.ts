import { TCartData } from "@/hooks/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TCartData[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCart: (_, action: PayloadAction<TCartData[]>) => {
      return action.payload;
    },
    addCart: (state, action: PayloadAction<TCartData>) => {
      return [...state, action.payload];
    },
    updateCart: (state, action: PayloadAction<TCartData>) => {
      const update = action.payload;
      return state.map((i) => (i._id === update._id ? update : i));
    },
    deleteCart: (state, action: PayloadAction<TCartData["_id"]>) => {
      return state.filter((i) => i._id !== action.payload);
    },
  },
});

export const { fetchCart, addCart, updateCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;
