import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import {
  PlanningCellPage,
  PlanningSeriesPage,
  PoultryCuttingExportPage,
  PoultryCuttingImportPage,
  PoultryCuttingReturnPage,
  PoultryCuttingSeriesPage,
  ProductionExportPage,
  ProductionImportByCarPage,
  ProductionImportFromWarehousePage,
  ProductionPage,
  ProductionReturnProductPage,
  ProductionSeriesPage,
} from "./index";
import { DashboardOverview } from "../home";

export const productionRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        index: true,
        element: React.createElement(DashboardOverview),
      },
      { path: "production/product", element: React.createElement(ProductionPage) },
      { path: "production/series", element: React.createElement(ProductionSeriesPage) },
      { path: "production/export", element: React.createElement(ProductionExportPage) },
      { path: "production/import-by-car", element: React.createElement(ProductionImportByCarPage) },
      { path: "production/import-from-warehouse", element: React.createElement(ProductionImportFromWarehousePage) },
      { path: "production/return-product", element: React.createElement(ProductionReturnProductPage) },
      { path: "planning/cell", element: React.createElement(PlanningCellPage) },
      { path: "planning/series", element: React.createElement(PlanningSeriesPage) },
      { path: "poultry-cutting/export", element: React.createElement(PoultryCuttingExportPage) },
      { path: "poultry-cutting/import", element: React.createElement(PoultryCuttingImportPage) },
      { path: "poultry-cutting/return", element: React.createElement(PoultryCuttingReturnPage) },
      { path: "poultry-cutting/series", element: React.createElement(PoultryCuttingSeriesPage) },
    ],
  },
];
