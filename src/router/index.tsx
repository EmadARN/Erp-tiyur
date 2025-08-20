import { useRoutes } from "react-router-dom";
import { saleRoutes } from "@/modules/sales/routes";
import { productionRoutes } from "@/modules/production/routes";
import { wareHouseRoutes } from "@/modules/wareHouse/routes";
import { authRoutes } from "@/modules/auth/routes";
import { buysRoutes } from "@/modules/buys/routes";
import { NotFoundPage, ServerErrorPage } from "@/modules/errors";
import { LandingRoute } from "@/modules/landing/routes";
import { kernelRoutes } from "@/modules/kernel/routes";
import { HomeRoutes } from "@/modules/home/route";
import { RequireAuth } from "@/modules/auth/RequireAuth";
import { GuestOnly } from "@/modules/auth/GuestOnly";

export const AppRoutes = () => {
  const routes = [
    // مسیرهای عمومی (همه می‌بینن)
    ...LandingRoute,

    // مسیرهایی که فقط برای مهمان‌ها (غیر لاگین) هستن
    {
      element: <GuestOnly />,
      children: [...authRoutes], // login, register, forgot password ...
    },

    // مسیرهایی که نیاز به لاگین دارن
    {
      element: <RequireAuth />,
      children: [
        ...HomeRoutes,
        ...saleRoutes,
        ...buysRoutes,
        ...productionRoutes,
        ...wareHouseRoutes,
        ...kernelRoutes,
      ],
    },

    { path: "/500", element: <ServerErrorPage /> },
    { path: "*", element: <NotFoundPage /> },
  ];

  return useRoutes(routes);
};
