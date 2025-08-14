import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import WareHousePage from "./pages/WareHousePage";
import InventoryPage from "./pages/inventoryPage";
import TransactionPage from "./pages/TransactionPage";

export const wareHouseRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "warehouse/warehouse",
        element: React.createElement(WareHousePage),
      },
      {
        path: "warehouse/inventory",
        element: React.createElement(InventoryPage),
      },

      {
        path: "warehouse/transaction",
        element: React.createElement(TransactionPage),
      },

      
    ],
  },
];
