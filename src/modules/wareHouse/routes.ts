import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import WareHousePage from "./pages/WareHousePage";
import InventoryPage from "./pages/inventoryPage";

export const wareHouseRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "warehouse/a",
        element: React.createElement(WareHousePage),
      },
      {
        path: "warehouse/inventory",
        element: React.createElement(InventoryPage),
      },
    ],
  },
];
