import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import Contact from "./pages/Contact.tsx";
import user from "./pages/User.tsx";
import agriculture from "@/modules/kernel/pages/Agriculture.tsx";
import city from "@/modules/kernel/pages/City.tsx";

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
    ],
  },
];
