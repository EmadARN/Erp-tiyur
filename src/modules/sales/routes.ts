import type { RouteObject } from "react-router-dom";
import { SalePage } from '@/modules/sales';
import React from "react";

export const salesRoutes: RouteObject[] = [
    {
        path: '/sales',
        element: React.createElement(SalePage),
    },
];