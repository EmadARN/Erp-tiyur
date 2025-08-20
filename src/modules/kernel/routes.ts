import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import Contact from "./pages/Contact.tsx";
import agriculture from "./pages/Agriculture.tsx";
import Driver from "./pages/Driver.tsx";
import Product from "./pages/Product.tsx";
import ProductCategory from "./pages/productCategory.tsx";
import productOwner from "./pages/ProductOwner.tsx";
import unit from "./pages/Unit.tsx";
import Car from "./pages/car.tsx";

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
        path: "kernel/product-category",
        element: React.createElement(ProductCategory),
      },
      {
        path: "kernel/product-owner",
        element: React.createElement(productOwner),
      },
      {
        path: "kernel/unit",
        element: React.createElement(unit),
      },
      {
        path: "kernel/car",
        element: React.createElement(Car),
      },


    ],
  },
];
