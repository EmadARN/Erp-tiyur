import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import BuyPage from "./pages/BuyPage";

export const buysRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "buys", // Maps to /dashboard/sales
        element: React.createElement(BuyPage),
      },
    ],
  },
];
