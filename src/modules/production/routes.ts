import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import ProductionPage from "./pages/ProductionPage";



export const productionRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "production/product",
        element: React.createElement(ProductionPage),
      },

    ],
  },
];
