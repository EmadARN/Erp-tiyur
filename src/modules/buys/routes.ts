import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import BuyPage from "./pages/BuyProductPage";

export const buysRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "buy/product",
        element: React.createElement(BuyPage),
      },
    ],
  },
];
