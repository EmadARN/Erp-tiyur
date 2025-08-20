import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import Contact from "./pages/Contact.tsx";
import user from "./pages/User.tsx";
import Driver from "./pages/Driver.tsx";

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
        path: "kernel/driver",
        element: React.createElement(Driver),
      },
    ],
  },
];
