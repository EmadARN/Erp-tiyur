import {
  FaShoppingCart,
  FaDollarSign,
  FaIndustry,
  FaWarehouse,
} from "react-icons/fa";
import type { IconType } from "react-icons/lib";

export interface StatCardStat {
  label: string;
  value: string;
}

export type TrendType = "up" | "down" | "check" | "alert";

export interface StatCardTrend {
  type: TrendType;
  value: string;
  desc: string;
}

export interface StatCardData {
  id: string;
  title: string;
  gradient: string;
  icon: IconType;
  stat: string;
  desc?: string;
  stats?: StatCardStat[];
  trend?: StatCardTrend;
  statusDot?: string;
}

export const statCards: StatCardData[] = [
  {
    id: "buy",
    title: "Buy",
    gradient: "from-green-700 via-green-600 to-green-500",
    icon: FaShoppingCart,
    stat: "1,247",
    desc: "Livestock purchased this month with average weight of 485kg per head",
    stats: [
      { label: "Total Cost", value: "$542,800" },
      { label: "Avg Price/Head", value: "$435" },
    ],
    trend: { type: "up", value: "+12.3%", desc: "vs last month" },
    statusDot: "bg-green-500",
  },
  {
    id: "sell",
    title: "Sell",
    gradient: "from-blue-800 via-blue-700 to-blue-600",
    icon: FaDollarSign,
    stat: "$847K",
    desc: "Revenue from meat products and byproducts sold to retailers and distributors",
    stats: [
      { label: "Units Sold", value: "2,340 tons" },
      { label: "Avg Price/kg", value: "$8.45" },
    ],
    trend: { type: "up", value: "+18.7%", desc: "vs last month" },
    statusDot: "bg-blue-500",
  },
  {
    id: "production",
    title: "Production",
    gradient: "from-orange-800 via-orange-600 to-orange-500",
    icon: FaIndustry,
    stat: "1,156",
    desc: "Animals processed with 87.4% yield efficiency and premium quality standards",
    stats: [
      { label: "Meat Yield", value: "1,890 tons" },
      { label: "Efficiency", value: "87.4%" },
    ],
    trend: { type: "check", value: "On Target", desc: "Quality: Grade A" },
    statusDot: "bg-orange-500",
  },
  {
    id: "warehouse",
    title: "Warehouse",
    gradient: "from-purple-800 via-purple-700 to-purple-600",
    icon: FaWarehouse,
    stat: "78.4%",
    desc: "Storage capacity utilization across cold storage and dry goods facilities",
    stats: [
      { label: "Total Capacity", value: "2,450 tons" },
      { label: "Available", value: "529 tons" },
    ],
    trend: { type: "alert", value: "5 Alerts", desc: "Low stock items" },
    statusDot: "bg-purple-500",
  },
];
