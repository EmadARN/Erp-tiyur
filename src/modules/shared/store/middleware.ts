import { salesApi } from "@/modules/sales/api/salesApi";
import type { Middleware } from "@reduxjs/toolkit";
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
import {planningSeriesApi} from "@/modules/production/api/plannigSeriesApi.ts";
import {planningCellApi} from "@/modules/production/api/planningCellApi.ts";
import {poultryCuttingExportApi} from "@/modules/production/api/poultryCuttingExportApi.ts";
import {poultryCuttingImportApi} from "@/modules/production/api/poultryCuttingImportApi.ts";
import {poultryCuttingReturnApi} from "@/modules/production/api/poultryCuttingReturnApi.ts";
import {poultryCuttingSeriesApi} from "@/modules/production/api/poultryCuttingSeriesApi.ts";
import {productionExportApi} from "@/modules/production/api/productionExportApi.ts";
import {productionImportByCarApi} from "@/modules/production/api/productionImportByCarApi.ts";
import {productionImportFromWarehouseApi} from "@/modules/production/api/productionImportFromWarehouseApi.ts";
import {productionReturnProductApi} from "@/modules/production/api/productionReturnProductApi.ts";
import {productionSeriesApi} from "@/modules/production/api/productionSeriesApi.ts";

export const middlewares: Middleware[] = [
  LoginApi.middleware,

  //productionApi:
  productionApi.middleware,
  planningSeriesApi.middleware,
  planningCellApi.middleware,
  poultryCuttingExportApi.middleware,
  poultryCuttingImportApi.middleware,
  poultryCuttingReturnApi.middleware,
  poultryCuttingSeriesApi.middleware,
  productionExportApi.middleware,
  productionImportByCarApi.middleware,
  productionImportFromWarehouseApi.middleware,
  productionReturnProductApi.middleware,
  productionSeriesApi.middleware,

  //saleApi:
  salesApi.middleware,
  orderApi.middleware,
  orderItemsApi.middleware,
  truckLoadingApi.middleware,
  loadedProductItemsApi.middleware,
  loadedProductApi.middleware,

  //buysApi:
  buyProductApi.middleware,
  shareApi.middleware,
  bankAccountApi.middleware,
  orderInvoiceApi.middleware,
  orderPaymentApi.middleware,
  purchaseOrderApi.middleware,

  //wareHouseApi:
  warehouseApi.middleware,
  inventoryApi.middleware,
  transactionApi.middleware
];
