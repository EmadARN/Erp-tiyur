import { useRoutes } from "react-router-dom";
import { salesRoutes } from "@/modules/sales/routes";

export const AppRoutes = () => {
  const routes = [
    ...salesRoutes,
    // ... سایر ماژول‌ها
  ];

  const element = useRoutes(routes);
  return element;
};
