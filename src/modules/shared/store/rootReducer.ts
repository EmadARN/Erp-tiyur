import { combineReducers } from "@reduxjs/toolkit";
import { salesApi } from "@/modules/sales/api/salesApi";
import uiSettingsReducer from "./slice/settingsSlice";
import themeReducer from "./slice/themeSlice";
import { LoginApi } from "@/modules/auth/api/Login";
import { buyProductApi } from "@/modules/buys/api/buyProductApi";
import { shareApi } from "../api/shareApi";
import { bankAccountApi } from "@/modules/buys/api/bankAccountApi.ts";
import { orderInvoiceApi } from "@/modules/buys/api/orderInvoiceApi.ts";
import { orderPaymentApi } from "@/modules/buys/api/orderPaymentApi.ts";
import { purchaseOrderApi } from "@/modules/buys/api/orderPurchaseOrderApi";
import { productionApi } from "@/modules/production/api/productionApi";
import { wareHouseApi } from "@/modules/wareHouse/api/wareHouseApi";
import { loadedProductItemsApi } from "@/modules/sales/api/loadedProductItemsApi";

export const rootReducer = combineReducers({
  [LoginApi.reducerPath]: LoginApi.reducer,
  [shareApi.reducerPath]: shareApi.reducer,

  //productionApi: 
  [productionApi.reducerPath]: productionApi.reducer,

  //saleApi: 
  [salesApi.reducerPath]: salesApi.reducer,
  [loadedProductItemsApi.reducerPath]: loadedProductItemsApi.reducer,

  //buysApi: 
  [buyProductApi.reducerPath]: buyProductApi.reducer,
  [bankAccountApi.reducerPath]: bankAccountApi.reducer,
  [orderInvoiceApi.reducerPath]: orderInvoiceApi.reducer,
  [orderPaymentApi.reducerPath]: orderPaymentApi.reducer,
  [purchaseOrderApi.reducerPath]: purchaseOrderApi.reducer,

  //wareHouseApi:
  [wareHouseApi.reducerPath]: wareHouseApi.reducer,

  uiSetting: uiSettingsReducer,
  theme: themeReducer,
});
