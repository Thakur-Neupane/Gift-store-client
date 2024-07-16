import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCats: [],
};

const subCatSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setSubCats: (state, { payload = [] }) => {
      state.subCats = payload;
    },
  },
});

const { reducer, actions } = subCatSlice;

export const { setSubCats } = actions;

export default reducer;
