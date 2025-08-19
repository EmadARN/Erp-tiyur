import StatCard from "../components/StatCard";
import { RevenueChart, UserChart, ModuleChart } from "../components/Charts";
import { statCards } from "../model/dashboard";
import RecentActivities from "../components/RecentActivities";
import TopProducts from "../components/TopProducts";
import Notifications from "../components/Notifications";

const DashboardOverview = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 xl:col-span-2 h-72">
            <RevenueChart />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-72">
            <UserChart />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 xl:col-span-3 h-96">
            <ModuleChart />
          </div>
        </div>

        {/* Bottom Grid: Recent Activities + Top Products + Notifications */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left: Recent Activities */}
          <RecentActivities />

          {/* Right: Top Products + Notifications */}
          <div className="space-y-6">
            <TopProducts />
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
