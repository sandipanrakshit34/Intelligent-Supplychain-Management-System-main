import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  products: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setProducts: (state, action) => {
      state.products = action.payload.products;
    },

    setProduct: (state, action) => {
      const updatedProducts = state.products.products.map((product) => {
        if (product._id === action.payload.product._id)
          return action.payload.product;
        return product;
      });

      state.products.products = updatedProducts;
      console.log(updatedProducts);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.productId
      );
    },
  },
});
export const {
  setMode,
  setLogin,
  setLogout,
  setProduct,
  setProducts,
  deleteProduct,
} = authSlice.actions;
export default authSlice.reducer;
