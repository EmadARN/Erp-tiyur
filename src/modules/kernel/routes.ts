import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import user from "./pages/User.tsx";
import agriculture from "@/modules/kernel/pages/Agriculture.tsx";
import city from "@/modules/kernel/pages/City.tsx";
import ProductOwner from "@/modules/kernel/pages/ProductOwner.tsx";
import ProductCategory from "@/modules/kernel/pages/productCategory.tsx";
import contact from "@/modules/kernel/pages/Contact.tsx";
import Product from "@/modules/kernel/pages/Product.tsx";

export const kernelRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "kernel/contact",
        element: React.createElement(contact),
      },
      {
        path: "kernel/user",
        element: React.createElement(user),
      },
      {
        path: "kernel/agriculture",
        element: React.createElement(agriculture),
      },
      {
        path: "kernel/city",
        element: React.createElement(city),
      },
      {
        path: "kernel/product-owner",
        element: React.createElement(ProductOwner),
      },
      {
        path: "kernel/product-category",
        element: React.createElement(ProductCategory),
      },
      {
        path: "kernel/products",
        element: React.createElement(Product),
      },
    ],
  },
];
