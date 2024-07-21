import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCats: [],
};

const subCatSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setSubCats: (state, action) => {
      state.subCats = action.payload; // Ensure the payload matches the structure of sub-categories array
    },
  },
});

export const { setSubCats } = subCatSlice.actions;

export default subCatSlice.reducer;
