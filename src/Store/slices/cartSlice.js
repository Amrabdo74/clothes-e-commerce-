import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  initialState: [],
  name: "cartSlice",
  reducers: {
    addTocart: (state, action) => {
      const findProduct = state.find(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );
      if (findProduct) {
        findProduct.quantity += 1;
        // const cartLocalstorge = JSON.parse(localStorage.getItem('cart'));
        //   console.log(cartLocalstorge);
      } else {
        const prodectClone = { ...action.payload, quantity: 1 };
        state.push(prodectClone);
      }
    },
    increseQuantity: (state, action) => {
      const findProduct = state.find(
        (product) =>
          product.size === action.payload.size &&
          product.id === action.payload.id
      );
      if (findProduct) {
        findProduct.quantity += 1;
      }
    },
    decreseQuantity: (state, action) => {
      const findProduct = state.find(
        (product) =>
          product.size === action.payload.size &&
          product.id === action.payload.id
      );
      if (findProduct) {
        if (findProduct.quantity>1){

          findProduct.quantity -= 1;
        } else {
          return state.filter(
            (product) =>
              product !== findProduct 
              
          );
        }
      }
    },

    removeFeomcart: (state, action) => {
      const findProduct = state.find(
        (product) =>
          product.size === action.payload.size &&
          product.id === action.payload.id
      );
      return state.filter((product) => product !== findProduct);
    },
    clearCart: (state, action) => {
      localStorage.setItem("cart", JSON.stringify([]));
      return [];
    },
    getFromlocaStore: (state, action) => {
      if (action.payload !== null) {
        return action.payload.filter((product) => product.quantity > 0);
      }
    },
  },
});
export const {
  addTocart,
  decreseQuantity,
  increseQuantity,
  removeFeomcart,
  clearCart,
  getFromlocaStore,
} = cartSlice.actions;
export default cartSlice.reducer;
