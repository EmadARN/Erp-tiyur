import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import StatCard from "../components/StatCard";
import { RevenueChart, UserChart, ModuleChart } from "../components/Charts";
import { statCards } from "../model/dashboard";
import TopProducts from "../components/TopProducts";
import Notifications from "../components/Notifications";

const DashboardOverview = () => {
  const { mode, rtl } = useThemeSettings();

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        mode === "dark" ? "bg-gray-900 text-gray-100" : " text-gray-900"
      }`}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className={`max-w-7xl mx-auto ${rtl ? "text-right" : "text-left"}`}>
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${
              mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Dashboard Overview
          </h1>
          <p className={mode === "dark" ? "text-gray-300" : "text-gray-600"}>
            Monitor your application's performance and key metrics in real-time
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card) => (
            <StatCard key={card.id} data={card} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div
            className={`rounded-xl shadow-sm border p-6 xl:col-span-2 h-72 ${
              mode === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <RevenueChart />
          </div>
          <div
            className={`rounded-xl shadow-sm border p-6 h-72 ${
              mode === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <UserChart />
          </div>
          <div
            className={`rounded-xl shadow-sm border p-6 xl:col-span-3 h-96 ${
              mode === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <ModuleChart />
          </div>
        </div>

        {/* Bottom Grid */}
        <div
          className={`grid grid-cols-1 xl:grid-cols-2 gap-6 ${
            rtl ? "text-right" : "text-left"
          }`}
        >
          <TopProducts />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
