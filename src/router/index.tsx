import { useRoutes } from "react-router-dom";
import { saleRoutes } from "@/modules/sales/routes";
import { productionRoutes } from "@/modules/production/routes";
import { wareHouseRoutes } from "@/modules/wareHouse/routes";

import { authRoutes } from "@/modules/auth/routes";
import { buysRoutes } from "@/modules/buys/routes";
import { NotFoundPage, ServerErrorPage } from "@/modules/errors";
import { LandingRoute } from "@/modules/landing/routes";
import { kernelRoutes } from "@/modules/kernel/routes";

export const AppRoutes = () => {
  const routes = [
    ...saleRoutes,
    ...authRoutes,
    ...buysRoutes,
    ...productionRoutes,
    ...wareHouseRoutes,
    ...LandingRoute,
    ...kernelRoutes,
    {
      path: "/500",
      element: <ServerErrorPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  const element = useRoutes(routes);
  return element;
};
