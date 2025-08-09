import { useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/modules/shared/components/header/Header";
import Sidebar from "@/modules/shared/components/sidebar/SideBar";
import Menu from "@/modules/shared/components/header/Menu";
import SettingsDrawerWrapper from "@/modules/shared/components/header/settingDrawer/SettingsDrawerWrapper";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import { cn } from "@/modules/shared/helpers";

const DashboardLayout = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { rtl } = useThemeSettings();

  return (
    <div
      ref={dashboardRef}
      className={cn("flex h-screen", rtl ? "flex-row-reverse" : "flex-row")}
    >
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="block md:hidden">
        <Menu />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          rtl ? "mr-12 md:mr-4" : "ml-12 md:ml-4"
        )}
      >
        <Header />
        <main className="p-4 overflow-auto">
          <Outlet />
        </main>
      </div>

      <SettingsDrawerWrapper dashboardRef={dashboardRef} />
    </div>
  );
};

export default DashboardLayout;
