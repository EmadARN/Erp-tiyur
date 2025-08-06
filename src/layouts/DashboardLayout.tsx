import { useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/modules/shared/components/header/Header";
import Sidebar from "@/modules/shared/components/sidebar/SideBar";
import Menu from "@/modules/shared/components/header/Menu";
import SettingsDrawerWrapper from "@/modules/shared/components/header/settingDrawer/SettingsDrawerWrapper";

const DashboardLayout = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={dashboardRef} className="flex h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="block md:hidden">
        <Menu />
      </div>

      <div className="flex flex-1 flex-col ml-12 md:ml-4">
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
