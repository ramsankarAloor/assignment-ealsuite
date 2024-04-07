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
        },
        onEdit(state, action){
            const {id, customerName, date, status, amount} = action.payload
            let obj
            for(let invoice of state.invoices){
                if(invoice.id === id){
                    obj = invoice
                    break
                }
            }
            obj.date = date
            obj.status = status
            obj.amount = amount
            obj.customer.name = customerName
        }
    }
})

export const invoicesActions = invoicesSlice.actions
export default invoicesSlice.reducer