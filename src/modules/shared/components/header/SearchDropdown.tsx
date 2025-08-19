import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const sidebarItems = [
  { label: "Production", path: "/dashboard/production/product" },
  { label: "Product", path: "/dashboard/production/product" },
  { label: "Series", path: "/dashboard/production/series" },
  { label: "Export", path: "/dashboard/production/export" },
  { label: "Import By Car", path: "/dashboard/production/import-by-car" },
  {
    label: "Import From Warehouse",
    path: "/dashboard/production/import-from-warehouse",
  },
  { label: "Return Product", path: "/dashboard/production/return-product" },
  { label: "Planning Cell", path: "/dashboard/planning/cell" },
  { label: "Planning Series", path: "/dashboard/planning/series" },
  {
    label: "Poultry Cutting Export",
    path: "/dashboard/poultry-cutting/export",
  },
  {
    label: "Poultry Cutting Import",
    path: "/dashboard/poultry-cutting/import",
  },
  {
    label: "Poultry Cutting Return",
    path: "/dashboard/poultry-cutting/return",
  },
  {
    label: "Poultry Cutting Series",
    path: "/dashboard/poultry-cutting/series",
  },
  { label: "Sale", path: "/dashboard/sale/product" },
  {
    label: "Sale Loaded Product Item",
    path: "/dashboard/sale/loaded-product-item",
  },
  { label: "Sale Loaded Product", path: "/dashboard/sale/loaded-product" },
  { label: "Sale Order", path: "/dashboard/sale/order" },
  { label: "Sale Order Items", path: "/dashboard/sale/order-items" },
  { label: "Sale Truck Loading", path: "/dashboard/sale/truck-loading" },
  { label: "Buy and Orders", path: "/dashboard/buy/product" },
  { label: "Bank Account", path: "/dashboard/buy/bank-account" },
  { label: "Product Order", path: "/dashboard/buy/product" },
  { label: "Invoice", path: "/dashboard/buy/invoice" },
  { label: "Payments", path: "/dashboard/buy/payment" },
  { label: "Purchase Order", path: "/dashboard/buy/purchase-order" },
  { label: "WareHouse", path: "/dashboard/warehouse/warehouse" },
  { label: "WareHouse Inventory", path: "/dashboard/warehouse/inventory" },
  { label: "WareHouse Transaction", path: "/dashboard/warehouse/transaction" },
];

const SearchDropdown = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = sidebarItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigation = (path: string) => {
    window.location.href = path;
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200"
        onClick={() => setOpen(!open)}
      >
        <FiSearch className="text-gray-600 text-xl" />
      </div>

      {open && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg sm:max-w-md md:max-w-xl bg-white shadow-2xl rounded-xl border border-gray-200 z-50 p-4">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 text-lg border-b border-gray-200 outline-none rounded-t-lg focus:ring-2 focus:ring-blue-500"
          />
          <ul className="max-h-96 overflow-y-auto mt-2">
            {filteredItems.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleNavigation(item.path)}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center rounded-md"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-500">{item.path}</p>
                </div>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-md">
                  Overview
                </span>
              </li>
            ))}
            {filteredItems.length === 0 && (
              <li className="px-4 py-3 text-gray-400 text-center">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
