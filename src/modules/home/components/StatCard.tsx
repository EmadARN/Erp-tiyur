import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import type { StatCardData } from "../model/dashboard";

interface Props {
  data: StatCardData;
}

const StatCard = ({ data }: Props) => {
  const { mode, rtl } = useThemeSettings();
  const Icon = data.icon;

  return (
    <div
      className={`relative rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl p-6 flex flex-col justify-between
      ${
        mode === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }
      `}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div
        className={`flex items-start justify-between mb-6 ${
          rtl ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex-1">
          <div
            className={`flex items-center mb-3 ${
              rtl ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"
            }`}
          >
            {data.statusDot && (
              <span
                className={`w-3 h-3 rounded-full ${data.statusDot} animate-pulse`}
              />
            )}
            <h3
              className={`${
                mode === "dark" ? "text-gray-100" : "text-gray-800"
              } text-md font-bold`}
            >
              {data.title}
            </h3>
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
        <div
          className={`${
            mode === "dark" ? "text-gray-100" : "text-gray-900"
          } text-2xl font-black mb-3`}
        >
          {data.stat}
        </div>
        {data.desc && (
          <p
            className={`${
              mode === "dark" ? "text-gray-300" : "text-gray-600"
            } text-sm leading-relaxed mb-4`}
          >
            {data.desc}
          </p>
        )}

        <div className="space-y-3">
          {data.stats?.map((stat, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center ${
                rtl ? "flex-row-reverse" : ""
              }`}
            >
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                {stat.label}
              </span>
              <span
                className={`${
                  mode === "dark" ? "text-gray-100" : "text-gray-900"
                } text-sm font-semibold`}
              >
                {stat.value}
              </span>
            </div>
          ))}

          {data.trend && (
            <div
              className={`flex items-center justify-between pt-2 border-t ${
                mode === "dark" ? "border-gray-700" : "border-gray-100"
              }`}
            >
              <span
                className={`${
                  data.trend.type === "up"
                    ? "text-green-500"
                    : data.trend.type === "down"
                    ? "text-red-500"
                    : data.trend.type === "check"
                    ? "text-green-500"
                    : "text-yellow-500"
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
              <span
                className={`${
                  mode === "dark" ? "text-gray-400" : "text-gray-500"
                } text-xs`}
              >
                {data.trend.desc}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress shimmer */}
      <div
        className={`absolute top-0 left-0 w-full h-1 animate-shimmer bg-gradient-to-r ${
          mode === "dark"
            ? "from-transparent via-gray-600/40 to-transparent"
            : "from-transparent via-gray-600/40 to-transparent"
        }`}
      />
    </div>
  );
};

export default StatCard;
