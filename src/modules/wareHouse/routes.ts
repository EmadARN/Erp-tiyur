import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import WareHousePage from "./pages/WareHousePage";

export const wareHouseRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "warehouse/product",
        element: React.createElement(WareHousePage),
      },
    ],
  },
];
