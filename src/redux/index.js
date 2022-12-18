/** @format */

import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import products from "./productSlice";

export const store = configureStore({
  reducer: {
    auth,
    products,
  },
});
