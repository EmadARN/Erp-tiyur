import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import BuyPage from "./pages/BuyProductPage";
import BankAccount from "./pages/bankAccountPage.tsx";
import OrderInvoice from "@/modules/buys/pages/orderInvoicePage.tsx";
import OrderPayment from "@/modules/buys/pages/orderPaymentPage.tsx";

export const buysRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "buy/product",
        element: React.createElement(BuyPage),
      },
      {
        path: "buy/bank-account",
        element: React.createElement(BankAccount),
      },
      {
        path: "buy/invoice",
        element: React.createElement(OrderInvoice),
      },
      {
        path: "buy/payment",
        element: React.createElement(OrderPayment),
      },
    ],
  },
];
