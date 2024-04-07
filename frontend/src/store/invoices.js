import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
    name : 'invoices',
    initialState : {invoices : []},
    reducers : {
        setInvoices(state, action){
            state.invoices = action.payload
            console.log("invoices => ", state.invoices)
        },
        onCreate(state, action){
            state.invoices.push(action.payload)
        }
    }
})

export const invoicesActions = invoicesSlice.actions
export default invoicesSlice.reducer