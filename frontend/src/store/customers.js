import { createSlice } from "@reduxjs/toolkit";

const customersSlice = createSlice({
  name: "customers",
  initialState: { customers: [] },
  reducers: {
    setCustomers(state, action) {
      state.customers = action.payload;
    },
    onCreate(state, action) {
      state.customers.push(action.payload);
    },
    onEdit(state, action) {
      const { id, name, phone, address, email } = action.payload;
      let obj;
      for (let customer of state.customers) {
        if (customer.id === id) {
          obj = customer;
          break;
        }
      }
      obj.name = name;
      obj.phone = phone;
      obj.email = email;
      obj.address = address;
    },
  },
});

export const customersActions = customersSlice.actions;
export default customersSlice.reducer;
