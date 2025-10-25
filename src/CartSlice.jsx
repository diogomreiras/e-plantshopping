import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {}, // Initialize items as an empty array => an empty cart
  },
  reducers: {
    addItem: (state, action) => {
      const { payload: plant } = action;

      if (state.items[plant.name]) {
        // If the item exists in the cart, increment it by 1
        state.items[plant.name].quantity++;
      } else {
        // If the item doesn't exist in the cart, add it with quantity 1
        state.items[plant.name] = { ...plant, quantity: 1 };
      }
    },
    removeItem: (state, action) => {
      const { payload: plant } = action;

      delete state.items[plant.name];
    },
    updateQuantity: (state, action) => {
      const { payload: { plant, quantity } } = action;

      if (state.items[plant.name]) {
        state.items[plant.name].quantity = quantity;
      }
      if (state.items[plant.name].quantity === 0) {
        delete state.items[plant.name];
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
