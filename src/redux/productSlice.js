/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { productsRef, db, auth } from "../config/fireabase";

const initialState = {
  draftProducts: {
    name: "iphone",
    description: "güzel telefon",
    price: 12222,
    tags: ["Phone", "ios"],
  },
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (_, { getState }) => {
    await addDoc(productsRef, getState().products.draftProducts);
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await deleteDoc(doc(db, "products", id));
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  products: [],
  reducers: {
    changeDraftProductName: (state, action) => {
      state.draftProducts.name = action.payload;
    },
    changeDraftProductDescription: (state, action) => {
      state.draftProducts.description = action.payload;
    },
    changeDraftProductPrice: (state, action) => {
      state.draftProducts.price = action.payload;
    },
    addDraftProductTag: (state, action) => {
      state.draftProducts.tags.push(action.payload);
    },
    deleteDraftProducttag: (state, action) => {
      state.draftProducts.tags.filter((tag) => tag !== action.payload);
    },
    clearDraftProduct: (state) => {
      state.draftProducts = initialState.draftProducts;
    },
    setDraftProduct: (state, action) => {
      state.draftProducts = action.payload;
    },
    setProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});
export const {
  changeDraftProductDescription,
  changeDraftProductName,
  changeDraftProductPrice,
  addDraftProductTag,
  deleteDraftProducttag,
  setProduct,
  clearDraftProduct,
  setDraftProduct,
} = productSlice.actions;

export default productSlice.reducer;
