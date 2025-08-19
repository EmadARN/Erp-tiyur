import type { StatCardData } from "../model/dashboard";

interface Props {
  data: StatCardData;
}

const StatCard = ({ data }: Props) => {
  const Icon = data.icon;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            {data.statusDot && (
              <span
                className={`w-3 h-3 rounded-full mr-2 ${data.statusDot} animate-pulse`}
              />
            )}
            <h3 className="text-md font-bold text-gray-800">{data.title}</h3>
          </div>
          {data.gradient && (
            <div
              className={`w-20 h-1 rounded-full bg-gradient-to-r ${data.gradient}`}
            ></div>
          )}
        </div>

        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${data.gradient} animate-float_slow`}
        >
          <Icon className="text-white text-xl" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="text-2xl font-black text-gray-900 mb-3">
          {data.stat}
        </div>
        {data.desc && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {data.desc}
          </p>
        )}

        <div className="space-y-3">
          {data.stats?.map((stat, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                {stat.label}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {stat.value}
              </span>
            </div>
          ))}

          {data.trend && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span
                className={`${
                  data.trend.type === "up"
                    ? "text-green-600"
                    : data.trend.type === "down"
                    ? "text-red-500"
                    : data.trend.type === "check"
                    ? "text-green-600"
                    : "text-yellow-600"
                } text-sm font-medium flex items-center`}
              >
                {data.trend.type === "up" && (
                  <i className="fas fa-arrow-up mr-1"></i>
                )}
                {data.trend.type === "down" && (
                  <i className="fas fa-arrow-down mr-1"></i>
                )}
                {data.trend.type === "check" && (
                  <i className="fas fa-check-circle mr-1"></i>
                )}
                {data.trend.type === "alert" && (
                  <i className="fas fa-exclamation-triangle mr-1"></i>
                )}
                {data.trend.value}
              </span>
              <span className="text-xs text-gray-400">{data.trend.desc}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress shimmer */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
    </div>
  );
};

export default StatCard;
