import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import Contact from "./pages/Contact.tsx";
import agriculture from "./pages/Agriculture.tsx";
import Driver from "./pages/Driver.tsx";
import Product from "./pages/Product.tsx";
import ProductCategory from "./pages/productCategory.tsx";
import productOwner from "./pages/ProductOwner.tsx";

export const kernelRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "kernel/contact",
        element: React.createElement(Contact),
      },
      {
        path: "kernel/agriculture",
        element: React.createElement(agriculture),
      },
      {
        path: "kernel/driver",
        element: React.createElement(Driver),
      },
      {
        path: "kernel/product",
        element: React.createElement(Product),
      },
      {
        path: "kernel/productcategory",
        element: React.createElement(ProductCategory),
      },
      {
        path: "kernel/productowner",
        element: React.createElement(productOwner),
      },

    ],
  },
];
