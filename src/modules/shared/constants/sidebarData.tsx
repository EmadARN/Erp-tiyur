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
        label: "sale loaded product item",
        icon: <FaFile />,
        path: "/dashboard/sale/loaded-product-item",
      },
      {
        id: "2.2",
        label: "sale loaded-product",
        icon: <FaFile />,
        path: "/dashboard/sale/loaded-product",
      },
      {
        id: "2.3",
        label: "sale order",
        icon: <FaFile />,
        path: "/dashboard/sale/order",
      },
      {
        id: "2.4",
        label: "sale order items",
        icon: <FaFile />,
        path: "/dashboard/sale/order-items",
      },
      {
        id: "2.5",
        label: "sale truck loading",
        icon: <FaFile />,
        path: "/dashboard/sale/truck-loading",
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
    path: "/dashboard/warehouse/warehouse",
    children: [
      {
        id: "4.1",
        label: "wareHouse inventory",
        icon: <FaFile />,
        path: "/dashboard/warehouse/inventory",
      },
      {
        id: "4.2",
        label: "wareHouse transaction",
        icon: <FaFile />,
        path: "/dashboard/warehouse/transaction",
      },
    ],
  },
];
