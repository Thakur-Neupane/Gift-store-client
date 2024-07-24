import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCats: [],
};

const subCatSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setSubCats: (state, { payload }) => {
      state.subCats = payload;
    },
  },
});

export const { setSubCats } = subCatSlice.actions;

export default subCatSlice.reducer;
