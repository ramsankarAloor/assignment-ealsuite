import { createSlice } from "@reduxjs/toolkit";

const customersSlice = createSlice({
    name : 'customers',
    initialState : {customers : []},
    reducers : {
        setCustomers(state, action){
            state.customers = action.payload
        },
        onCreate(state, action) {
            state.customers.push(action.payload)
        }
    }
})

export const customersActions = customersSlice.actions
export default customersSlice.reducer