import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productslice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, { payload = [] }) => {
      state.products = payload;
    },
  },
});

const { reducer, actions } = productslice;

export const { setProducts } = actions;

export default reducer;
