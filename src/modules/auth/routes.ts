import { LoginPage } from "@/modules/auth"
import React from "react";
import type { RouteObject } from "react-router-dom";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element:  React.createElement(LoginPage),
      },
    ],
  },
];
