import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import WareHousePage from "./pages/WareHousePage";
import InventoryPage from "./pages/inventoryPage";
import TransactionPage from "./pages/TransactionPage";
import { DashboardOverview } from "../home";

export const wareHouseRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        index: true,
        element: React.createElement(DashboardOverview),
      },
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
