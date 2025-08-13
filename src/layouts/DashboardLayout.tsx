import { useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/modules/shared/components/header/Header";
import Sidebar from "@/modules/shared/components/sidebar/SideBar";
import Menu from "@/modules/shared/components/header/Menu";
import SettingsDrawerWrapper from "@/modules/shared/components/header/settingDrawer/SettingsDrawerWrapper";
import { cn } from "@/modules/shared/helpers";

const DashboardLayout = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);


  return (
    <div
      ref={dashboardRef}
      className={cn(
        "flex h-screen min-h-screen flex-row",
       
      )}
    >
      {/* Sidebar دسکتاپ */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* منوی موبایل */}
      <div className="block lg:hidden">
        <Menu />
      </div>

      {/* بخش محتوای اصلی */}
      <div
        className={cn(
          "flex flex-1 flex-col ml-0 sm:ml-4 md:ml-6 lg:ml-12",
          // در موبایل padding جانبی کمتر و در دسکتاپ فاصله به sidebar
         
        )}
      >
        <Header />
        <main className="p-4 overflow-auto min-h-0 flex-1">
          <Outlet />
        </main>
      </div>

      <SettingsDrawerWrapper dashboardRef={dashboardRef} />
    </div>
  );
};

export default DashboardLayout;
