import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import customersReducer from "./customers";
import invoicesReducer from "./invoices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    invoices: invoicesReducer
  },
});

export default store;
