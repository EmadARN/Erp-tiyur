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
import { wareHouseApi } from "@/modules/wareHouse/api/wareHouseApi";
import { loadedProductItemsApi } from "@/modules/sales/api/loadedProductItemsApi";
import { loadedProductApi } from "@/modules/sales/api/loadedProductApi";
import { inventoryApi } from "@/modules/wareHouse/api/inventoryApi";
import { transactionApi } from "@/modules/wareHouse/api/transactionApi";
export const middlewares: Middleware[] = [
  LoginApi.middleware,

  //productionApi:
  productionApi.middleware,

  //saleApi:
  salesApi.middleware,
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
  wareHouseApi.middleware,
  inventoryApi.middleware,
  transactionApi.middleware
];
