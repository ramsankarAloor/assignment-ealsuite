import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import customersReducer from "./customers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
  },
});

export default store;
