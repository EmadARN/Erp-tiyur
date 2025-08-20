
//settingDrawer:
export const presets = [
    { color: "bg-green-500", value: "green" },
    { color: "bg-purple-500", value: "purple" },
    { color: "bg-sky-500", value: "sky" },
    { color: "bg-orange-400", value: "orange" },
];

export const fonts = [
    {
        name: "Public Sans",
        fontClass: "font-sans text-green-500",
        value: "public",
    },
    { name: "Inter", fontClass: "font-sans", value: "inter" },
    { name: "DM Sans", fontClass: "font-sans", value: "dm" },
    { name: "Nunito Sans", fontClass: "font-sans", value: "nunito" },
];


export const sidebarItems = [
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
