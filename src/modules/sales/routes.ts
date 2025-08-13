import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import SalePage from "./pages/SalePage";
import LoadedProductItemsPage from "./pages/LoadedProductItemsPage";
import LoadedProductPage from "./pages/LoadedProductPage";




export const saleRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
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

    ],
    
  },
];
