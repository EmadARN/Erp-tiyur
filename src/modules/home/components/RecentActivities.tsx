const activities = [
  { user: "John Doe", action: "placed an order", time: "2 mins ago" },
  { user: "Jane Smith", action: "updated profile", time: "10 mins ago" },
  { user: "Mike Johnson", action: "added new product", time: "30 mins ago" },
  { user: "Emily Davis", action: "deleted an order", time: "1 hr ago" },
];

const RecentActivities = () => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activities
      </h3>
      <ul className="divide-y divide-gray-200">
        {activities.map((act, idx) => (
          <li key={idx} className="py-3 flex justify-between items-center">
            <span className="text-sm text-gray-700">
              <strong>{act.user}</strong> {act.action}
            </span>
            <span className="text-xs text-gray-400">{act.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
