import { GiCow } from "react-icons/gi";
import { FaShoppingCart, FaDollarSign, FaWarehouse } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

export interface StatCardData {
    id: string;
    title: string;
    value: string;
    change: string;
    changeType: "up" | "down";
    description: string;
    color: string;
    icon: IconType;
}

export const statCards: StatCardData[] = [
    {
        id: "production",
        title: "Production",
        value: "320 Heads",
        change: "+5%",
        changeType: "up",
        description: "vs last week",
        color: "from-blue-500 to-blue-600",
        icon: GiCow,
    },
    {
        id: "buy",
        title: "Buy",
        value: "210 Heads",
        change: "-3%",
        changeType: "down",
        description: "vs last week",
        color: "from-green-500 to-green-600",
        icon: FaShoppingCart,
    },
    {
        id: "sell",
        title: "Sell",
        value: "$45,200",
        change: "+12%",
        changeType: "up",
        description: "vs last week",
        color: "from-yellow-500 to-yellow-600",
        icon: FaDollarSign,
    },
    {
        id: "warehouse",
        title: "Warehouse",
        value: "82% Capacity",
        change: "+4%",
        changeType: "up",
        description: "inventory usage",
        color: "from-purple-500 to-purple-600",
        icon: FaWarehouse,
    },
];
