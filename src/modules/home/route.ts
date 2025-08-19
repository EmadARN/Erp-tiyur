import { type RouteObject } from "react-router-dom";
import { DashboardOverview } from "./index";
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";

export const HomeRoutes: RouteObject[] = [

    {
        path: "/dashboard",
        element: React.createElement(DashboardLayout),
        children: [
            {
                index: true,
                element: React.createElement(DashboardOverview),
            },
        ]

    },
];


