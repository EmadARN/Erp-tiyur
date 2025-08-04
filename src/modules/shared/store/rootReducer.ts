import { combineReducers } from '@reduxjs/toolkit'
import { salesApi } from '@/modules/sales/api/salesApi'
// import { inventoryApi } from '@/modules/inventory/api/inventoryApi'

export const rootReducer = combineReducers({
    [salesApi.reducerPath]: salesApi.reducer,
    // [inventoryApi.reducerPath]: inventoryApi.reducer,
})
