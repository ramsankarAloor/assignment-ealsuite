import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
    name : 'invoices',
    initialState : {invoices : []},
    reducers : {
        setInvoices(state, action){
            state.invoices = action.payload
        }
    }
})

export const invoicesActions = invoicesSlice.actions
export default invoicesSlice.reducer