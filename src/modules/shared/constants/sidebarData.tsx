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
    label: "Sales",
    icon: <FaFolder />,
    path: "/dashboard/sales",
    children: [
      {
        id: "1.1",
        label: "sales A",
        icon: <FaFile />,
        path: "/dashboard/sales/a",
      },
      {
        id: "1.2",
        label: "sales B",
        icon: <FaFile />,
        path: "/dashboard/sales/b",
      },
    ],
  },
  {
    id: "2",
    label: "Documents",
    icon: <FaFolder />,
    children: [
      { id: "2.1", label: "Doc 1", icon: <FaFile />, path: "/doc - 1" },
    ],
  },
];
