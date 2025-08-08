import { useRoutes } from "react-router-dom";
import { salesRoutes } from "@/modules/sales/routes";
import { authRoutes } from "@/modules/auth/routes";

export const AppRoutes = () => {
  const routes = [
    ...salesRoutes,
    ...authRoutes
  ];

  const element = useRoutes(routes);
  return element;
};
