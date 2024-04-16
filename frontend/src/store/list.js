import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: { list: [] },
  reducers: {
    setList(state, action) {
      state.list = action.payload;
    },
    onCreate(state, action) {
      state.list.push(action.payload);
    },
    // onEdit(state, action) {
    //   const { id, name, phone, address, email } = action.payload;
    //   let obj;
    //   for (let customer of state.customers) {
    //     if (customer.id === id) {
    //       obj = customer;
    //       break;
    //     }
    //   }
    //   obj.name = name;
    //   obj.phone = phone;
    //   obj.email = email;
    //   obj.address = address;
    // },
  },
});

export const customersActions = listSlice.actions;
export default listSlice.reducer;
