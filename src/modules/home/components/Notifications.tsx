import { FaBell } from "react-icons/fa";

const notifications = [
  { message: "New order received", time: "5 mins ago" },
  { message: "Low stock alert: Chicken Breast", time: "20 mins ago" },
  { message: "Revenue target achieved", time: "1 hr ago" },
];

const Notifications = () => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FaBell className="text-blue-500" /> Notifications
      </h3>
      <ul className="divide-y divide-gray-200">
        {notifications.map((note, idx) => (
          <li key={idx} className="py-3 flex justify-between items-center">
            <span className="text-sm text-gray-700">{note.message}</span>
            <span className="text-xs text-gray-400">{note.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
