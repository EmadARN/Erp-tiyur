// import type { RouteObject } from "react-router-dom";
// import { SalePage } from '@/modules/sales';
// import React from "react";

// export const salesRoutes: RouteObject[] = [
//     {
//         path: '/sales',
//         element: React.createElement(SalePage),
//     },
// ];

// import { SalePage } from "@/modules/sales";
// import DashboardLayout from "@/layouts/DashboardLayout";
// import React from "react";
// import type { RouteObject } from "react-router-dom";

// export const salesRoutes: RouteObject[] = [
//     {
//         path: "/dashboard",
//         element: React.createElement(DashboardLayout),
//         children: [
//             {
//                 index: true,
//                 element: React.createElement(SalePage),
//             },
//         ],
//     },
// ];

import { SalePage } from "@/modules/sales";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";

export const salesRoutes: RouteObject[] = [
    {
        path: "/dashboard",
        element: React.createElement(DashboardLayout),
        children: [

            {
                path: "sales", // Maps to /dashboard/sales
                element: React.createElement(SalePage)
            },
        ],
    },
];