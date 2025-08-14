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
export const middlewares: Middleware[] = [
  LoginApi.middleware,

  //productionApi:
  productionApi.middleware,

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
