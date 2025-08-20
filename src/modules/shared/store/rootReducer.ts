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
import { warehouseApi } from "@/modules/wareHouse/api/wareHouseApi";
import { loadedProductItemsApi } from "@/modules/sales/api/loadedProductItemsApi";
import { loadedProductApi } from "@/modules/sales/api/loadedProductApi";
import { inventoryApi } from "@/modules/wareHouse/api/inventoryApi.ts";
import { orderApi } from "@/modules/sales/api/orderApi";
import { orderItemsApi } from "@/modules/sales/api/orderItemsApi";
import { truckLoadingApi } from "@/modules/sales/api/truckLoadingApi";
import { transactionApi } from "@/modules/wareHouse/api/transactionApi";
import { planningSeriesApi } from "@/modules/production/api/plannigSeriesApi.ts";
import { planningCellApi } from "@/modules/production/api/planningCellApi.ts";
import { poultryCuttingExportApi } from "@/modules/production/api/poultryCuttingExportApi.ts";
import { poultryCuttingImportApi } from "@/modules/production/api/poultryCuttingImportApi.ts";
import { poultryCuttingReturnApi } from "@/modules/production/api/poultryCuttingReturnApi.ts";
import { poultryCuttingSeriesApi } from "@/modules/production/api/poultryCuttingSeriesApi.ts";
import { productionExportApi } from "@/modules/production/api/productionExportApi.ts";
import { productionImportByCarApi } from "@/modules/production/api/productionImportByCarApi.ts";
import { productionImportFromWarehouseApi } from "@/modules/production/api/productionImportFromWarehouseApi.ts";
import { productionReturnProductApi } from "@/modules/production/api/productionReturnProductApi.ts";
import { productionSeriesApi } from "@/modules/production/api/productionSeriesApi.ts";
import { contactApi } from "@/modules/kernel/api/ContactApi";
import { userApi } from "@/modules/kernel/api/userApi";
import {agricultureApi} from "@/modules/kernel/api/agricultureApi.ts";
import {cityApi} from "@/modules/kernel/api/cityApi.ts";
import {productOwnerApi} from "@/modules/kernel/api/productOwnerApi.ts";

export const rootReducer = combineReducers({
  [LoginApi.reducerPath]: LoginApi.reducer,
  [shareApi.reducerPath]: shareApi.reducer,

  //productionApi:
  [productionApi.reducerPath]: productionApi.reducer,
  [planningSeriesApi.reducerPath]: planningSeriesApi.reducer,
  [planningCellApi.reducerPath]: planningCellApi.reducer,
  [poultryCuttingExportApi.reducerPath]: poultryCuttingExportApi.reducer,
  [poultryCuttingImportApi.reducerPath]: poultryCuttingImportApi.reducer,
  [poultryCuttingReturnApi.reducerPath]: poultryCuttingReturnApi.reducer,
  [poultryCuttingSeriesApi.reducerPath]: poultryCuttingSeriesApi.reducer,
  [productionExportApi.reducerPath]: productionExportApi.reducer,
  [productionImportByCarApi.reducerPath]: productionImportByCarApi.reducer,
  [productionImportFromWarehouseApi.reducerPath]:
    productionImportFromWarehouseApi.reducer,
  [productionReturnProductApi.reducerPath]: productionReturnProductApi.reducer,
  [productionSeriesApi.reducerPath]: productionSeriesApi.reducer,

  //saleApi:
  [salesApi.reducerPath]: salesApi.reducer,
  [loadedProductItemsApi.reducerPath]: loadedProductItemsApi.reducer,
  [loadedProductApi.reducerPath]: loadedProductApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [orderItemsApi.reducerPath]: orderItemsApi.reducer,
  [truckLoadingApi.reducerPath]: truckLoadingApi.reducer,

  //buysApi:
  [buyProductApi.reducerPath]: buyProductApi.reducer,
  [bankAccountApi.reducerPath]: bankAccountApi.reducer,
  [orderInvoiceApi.reducerPath]: orderInvoiceApi.reducer,
  [orderPaymentApi.reducerPath]: orderPaymentApi.reducer,
  [purchaseOrderApi.reducerPath]: purchaseOrderApi.reducer,

  //wareHouseApi:
  [warehouseApi.reducerPath]: warehouseApi.reducer,
  [inventoryApi.reducerPath]: inventoryApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,

  //kernel
  [contactApi.reducerPath]: contactApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [agricultureApi.reducerPath]: agricultureApi.reducer,
  [cityApi.reducerPath]: cityApi.reducer,
  [productOwnerApi.reducerPath]: productOwnerApi.reducer,


  uiSetting: uiSettingsReducer,
  theme: themeReducer,
});
