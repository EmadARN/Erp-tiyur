import { useRoutes } from "react-router-dom";
import { salesRoutes } from "@/modules/sales/routes";
import { authRoutes } from "@/modules/auth/routes";
import { buysRoutes } from "@/modules/buys/routes";

export const AppRoutes = () => {
  const routes = [
    ...salesRoutes,
    ...authRoutes,
    ...buysRoutes
  ];

  const element = useRoutes(routes);
  return element;
};
