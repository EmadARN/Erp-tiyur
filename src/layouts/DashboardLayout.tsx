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
      className={cn(
        "flex h-screen min-h-screen",
        rtl ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Sidebar desc */}
      <div className="hidden lg:block ">
        <Sidebar />
      </div>

      {/* Humberger menu */}
      <div className="block lg:hidden">
        <Menu />
      </div>

      {/*main section*/}

      <div
        className={cn(
          "flex flex-1 flex-col min-w-0", // ⬅ min-w-0 اضافه شد
          rtl
            ? "mr-0 sm:mr-4 md:mr-6 lg:mr-12"
            : "ml-0 sm:ml-4 md:ml-6 lg:ml-12"
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
