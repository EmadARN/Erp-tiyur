import type { StatCardData } from "../model/dashboard";

interface Props {
  data: StatCardData;
}

const StatCard = ({ data }: Props) => {
  const Icon = data.icon;

  return (
    <div className="stat-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            {data.title}
          </p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{data.value}</p>
          <div className="flex items-center">
            <span
              className={`${
                data.changeType === "up" ? "text-green-600" : "text-red-500"
              } text-sm font-medium flex items-center`}
            >
              {data.changeType === "up" ? "▲" : "▼"} {data.change}
            </span>
            <span className="text-gray-400 text-sm ml-2">
              {data.description}
            </span>
          </div>
        </div>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${data.color} rounded-xl flex items-center justify-center shadow-lg`}
        >
          <Icon className="text-white text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
