import { combineReducers } from "@reduxjs/toolkit";
import { salesApi } from "@/modules/sales/api/salesApi";
import uiSettingsReducer from "./slice/settingsSlice";
import themeReducer from "./slice/themeSlice";
import { LoginApi } from "@/modules/auth/api/Login";
import { buyProductApi } from "@/modules/buys/api/buyProductApi";
import { shareApi } from "../api/shareApi";

export const rootReducer = combineReducers({
  [salesApi.reducerPath]: salesApi.reducer,
  [buyProductApi.reducerPath]: buyProductApi.reducer,
  [LoginApi.reducerPath]: LoginApi.reducer,
  [shareApi.reducerPath]: shareApi.reducer,

  uiSetting: uiSettingsReducer,
  theme: themeReducer,
});
