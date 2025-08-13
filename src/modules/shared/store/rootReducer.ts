import { combineReducers } from "@reduxjs/toolkit";
import { salesApi } from "@/modules/sales/api/salesApi";
import uiSettingsReducer from "./slice/settingsSlice";
import themeReducer from "./slice/themeSlice";
import { LoginApi } from "@/modules/auth/api/Login";
import { buyProductApi } from "@/modules/buys/api/buyProductApi";
import { shareApi } from "../api/shareApi";
import {bankAccountApi} from "@/modules/buys/api/bankAccountApi.ts";
import {orderInvoiceApi} from "@/modules/buys/api/orderInvoiceApi.ts";
import {orderPaymentApi} from "@/modules/buys/api/orderPaymentApi.ts";

export const rootReducer = combineReducers({
  [salesApi.reducerPath]: salesApi.reducer,
  [buyProductApi.reducerPath]: buyProductApi.reducer,
  [bankAccountApi.reducerPath]: bankAccountApi.reducer,
  [orderInvoiceApi.reducerPath]: orderInvoiceApi.reducer,
  [orderPaymentApi.reducerPath]: orderPaymentApi.reducer,
  [LoginApi.reducerPath]: LoginApi.reducer,
  [shareApi.reducerPath]: shareApi.reducer,

  uiSetting: uiSettingsReducer,
  theme: themeReducer,
});
