import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

export const RevenueChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [
          85000, 92000, 88000, 105000, 98000, 115000, 127000, 118000, 135000,
          142000, 138000, 155000,
        ],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{ responsive: true, maintainAspectRatio: false }}
    />
  );
};

export const UserChart = () => {
  const data = {
    labels: ["Premium", "Standard", "Free"],
    datasets: [
      {
        data: [42, 35, 23],
        backgroundColor: ["#3B82F6", "#10B981", "#8B5CF6"],
        cutout: "70%",
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{ responsive: true, maintainAspectRatio: false }}
    />
  );
};

export const ModuleChart = () => {
  const data = {
    labels: [
      "Authentication",
      "Dashboard",
      "Analytics",
      "User Management",
      "Settings",
      "Reports",
      "API Gateway",
      "Billing",
    ],
    datasets: [
      {
        label: "Active Users",
        data: [8500, 7200, 6800, 5900, 4200, 3800, 3200, 2100],
        backgroundColor: "#3B82F6",
        borderRadius: 8,
      },
    ],
  };
  return (
    <Bar
      data={data}
      options={{ responsive: true, maintainAspectRatio: false }}
    />
  );
};
