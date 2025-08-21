import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import { FaBell } from "react-icons/fa";

const notifications = [
  { message: "New order received", time: "5 mins ago" },
  { message: "Low stock alert: Chicken Breast", time: "20 mins ago" },
  { message: "Revenue target achieved", time: "1 hr ago" },
];

const Notifications = () => {
  const { mode, rtl } = useThemeSettings();

  return (
    <div
      className={`shadow-sm border rounded-xl p-6 mb-8 transition-colors duration-300
        ${
          mode === "dark"
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-900"
        }
      `}
      dir={rtl ? "rtl" : "ltr"}
    >
      <h3
        className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
          mode === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        <FaBell className="text-blue-500" /> Notifications
      </h3>
      <ul
        className={`divide-y ${
          mode === "dark" ? "divide-gray-700" : "divide-gray-200"
        }`}
      >
        {notifications.map((note, idx) => (
          <li
            key={idx}
            className={`py-3 flex justify-between items-center ${
              rtl ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <span
              className={`${
                mode === "dark" ? "text-gray-100" : "text-gray-700"
              } text-sm`}
            >
              {note.message}
            </span>
            <span
              className={`${
                mode === "dark" ? "text-gray-400" : "text-gray-400"
              } text-xs`}
            >
              {note.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
