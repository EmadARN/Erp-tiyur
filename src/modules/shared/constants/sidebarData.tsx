import { FaHome, FaFolder, FaFile } from "react-icons/fa";

export const navItems = [
  {
    id: 1,
    label: "Home",
    icon: <FaHome />,
    path: "/dashboard",
  },
];

export const treeData = [
  {
    id: "1",
    label: "Production",
    icon: <FaFolder />,
    path: "/dashboard/Production/product",
    children: [
      {
        id: "1.1",
        label: "production A",
        icon: <FaFile />,
        path: "/dashboard/Production/a",
      },
      {
        id: "1.2",
        label: "production B",
        icon: <FaFile />,
        path: "/dashboard/Production/b",
      },
    ],
  },

  {
    id: "2",
    label: "Sale",
    icon: <FaFolder />,
    path: "/dashboard/sale/product",
    children: [
      {
        id: "2.1",
        label: "sales A",
        icon: <FaFile />,
        path: "/dashboard/sale/a",
      },
      {
        id: "2.2",
        label: "sales B",
        icon: <FaFile />,
        path: "/dashboard/sale/b",
      },
    ],
  },
  {
    id: "3",
    label: "Buy and Orders",
    icon: <FaFolder />,
    path: "/dashboard/buy/product",
    children: [
      {
        id: "3.1",
        label: "Bank Account",
        icon: <FaFile />,
        path: "/dashboard/buy/bank-account",
      },
      {
        id: "3.2",
        label: "Product Order",
        icon: <FaFile />,
        path: "/dashboard/buy/product",
      },
      {
        id: "3.3",
        label: "Invoice",
        icon: <FaFile />,
        path: "/dashboard/buy/invoice",
      },
      {
        id: "3.4",
        label: "Payments",
        icon: <FaFile />,
        path: "/dashboard/buy/payment",
      },
      {
        id: "3.5",
        label: "Purchase Order",
        icon: <FaFile />,
        path: "/dashboard/buy/purchase-order",
      },
    ],
  },
  {
    id: "4",
    label: "WareHouse",
    icon: <FaFolder />,
    path: "/dashboard/warehouse/product",
    children: [
      {
        id: "4.1",
        label: "wareHouse A",
        icon: <FaFile />,
        path: "/dashboard/warehouse/a",
      },
      {
        id: "4.2",
        label: "wareHouse B",
        icon: <FaFile />,
        path: "/dashboard/warehouse/b",
      },
    ],
  },
];
