import { useRoutes } from "react-router-dom";
import { salesRoutes } from "@/modules/sales/routes";
import { authRoutes } from "@/modules/auth/routes";
import { buysRoutes } from "@/modules/buys/routes";
import { NotFoundPage, ServerErrorPage } from "@/modules/errors";

export const AppRoutes = () => {
  const routes = [
    ...salesRoutes,
    ...authRoutes,
    ...buysRoutes,
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
