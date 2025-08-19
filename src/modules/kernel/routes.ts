import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import Contact from "./pages/Contact.tsx";
import user from "./pages/User.tsx";

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
    ],
  },
];
