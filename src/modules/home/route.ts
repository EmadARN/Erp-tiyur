import { type RouteObject } from "react-router-dom";
import { DashboardOverview } from "./index";
import React from "react";

export const HomeRoutes: RouteObject[] = [

    {
        path: "/dashboard",
        element: React.createElement(DashboardOverview),


    },
];


