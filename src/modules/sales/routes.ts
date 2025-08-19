import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import SalePage from "./pages/SalePage";
import LoadedProductItemsPage from "./pages/LoadedProductItemsPage";
import LoadedProductPage from "./pages/LoadedProductPage";
import OrderPage from "@/modules/sales/pages/orderPage.tsx";
import OrderItemsPage from "@/modules/sales/pages/OrderItemsPage.tsx";
import TruckLoadingPage from "@/modules/sales/pages/TruckLoadingPage.tsx";
import { DashboardOverview } from "../home";


export const saleRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        index: true,
        element: React.createElement(DashboardOverview),
      },
      {
        path: "sale/product",
        element: React.createElement(SalePage),
      },
      {
        path: "sale/loaded-product-item",
        element: React.createElement(LoadedProductItemsPage),
      },
      {
        path: "sale/loaded-product",
        element: React.createElement(LoadedProductPage),
      },
      {
        path: "sale/order",
        element: React.createElement(OrderPage),
      },
      {
        path: "sale/order-items",
        element: React.createElement(OrderItemsPage),
      },
      {
        path: "sale/truck-loading",
        element: React.createElement(TruckLoadingPage),
      },],

  },
];
