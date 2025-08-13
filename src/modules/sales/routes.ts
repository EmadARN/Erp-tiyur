import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import SalePage from "./pages/SalePage";




export const saleRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "sale/product",
        element: React.createElement(SalePage),
      },

    ],
  },
];
