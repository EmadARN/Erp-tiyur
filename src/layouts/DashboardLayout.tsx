import { Outlet } from "react-router-dom";
import Header from "@/modules/shared/components/header/Header";
import Sidebar from "@/modules/shared/components/sidebar/SideBar";
import Menu from "@/modules/shared/components/header/Menu";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="block md:hidden">
        <Menu />
      </div>

      <div className="flex flex-col flex-1 ml-12 md:ml-4">
        <Header />
        <main className="p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
