import  { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { Button } from "@/modules/shared/components/ui/Button";
import Breadcrumb from "@/modules/shared/components/ui/Breadcrumb";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import type { TableColumn, TableFilter } from "@/modules/shared/types";
import { useGetBuysQuery } from "../api/buyApi";

const BuyPage = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filterData, setFilterData] = useState<boolean>([]);
  const [createIndex, setCreateIndex] = useState<number | null>(null);

  const { data, error, loading } = useGetBuysQuery();

  console.log("buydata", data);
  console.log("error", error);
  const [table_data, setTableData] = useState<any>([
    {
      username: "rezabh",
      first_name: "Reza",
      last_name: "Bhm",
      role: "User",
    },
    {
      username: "alij",
      first_name: "Ali",
      last_name: "JJJ",
      role: "Admin",
    },
  ]);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Components", href: "/docs/components" },
    { label: "Sale" }, // آیتم آخر معمولاً لینک نداره
  ];

  const tableHead: TableColumn[] = [
    { columnName: "Member", row_id: "username", type: "string" },
    { columnName: "First Name", row_id: "first_name", type: "string" },
    {
      columnName: "Last Name",
      row_id: "last_name",
      type: "string",
      onClick: (row: any) => {
        setSelectedItem(row);
      },
    },
    {
      columnName: "Role",
      row_id: "role",
      type: "string",
      options: ["Admin", "User", "Guest"],
    },
  ];

  const table_filter: TableFilter[] = [
    {
      label: "price (Toman)",
      type: "range",
      name: "price-range",
      max: 1000,
      min: 10,
      step: 10,
      defaultValue: [100, 500], // پیش‌فرض بازه
    },
    {
      name: "location",
      label: "location",
      type: "autocomplete",
      options: ["vanak", "zanjan", "fereshte"],
      placeholder: "search for location",
      defaultValue: "vanak",
    },
    {
      name: "sort-by",
      label: "sort by",
      type: "select-box",
      options: ["max-price", "low-price"],
      defaultValue: "max-price",
    },
    {
      name: "price-based",
      label: "price-based",
      type: "switch",
      defaultValue: true,
    },
    {
      name: "construction-based",
      label: "costruction select",
      type: "multi-select",
      options: ["iran", "dubai"],
      defaultValue: ["iran"],
    },
    {
      name: "price-form",
      label: "price",
      type: "range-box",
      defaultValue: [200, 800],
    },
  ];
  const createDialogConfigs = [
    {
      name: "title",
      label: "title product",
      type: "string-input",
      defaultValue: "product-1",
    },
    {
      name: "sort-by",
      label: "sort by",
      type: "select-box",
      options: ["max-price", "low-price"],
      defaultValue: "max-price",
    },
    {
      name: "price-based",
      label: "price-based",
      type: "switch",
      defaultValue: true,
    },
    {
      name: "construction-based",
      label: "costruction select",
      type: "multi-select",
      options: ["iran", "dubai"],
      defaultValue: ["iran"],
    },
  ];

  const updateDialogConfigs = [
    {
      name: "title",
      label: "عنوان محصول",
      type: "string-input",
    },
    {
      name: "sort-by",
      label: "مرتب‌سازی بر اساس",
      type: "select-box",
      options: ["max-price", "low-price"],
    },
    {
      name: "price-based",
      label: "بر اساس قیمت",
      type: "switch",
    },
    {
      name: "construction-based",
      label: "انتخاب محل ساخت",
      type: "multi-select",
      options: ["iran", "dubai"],
    },
  ];

  const existingData = {
    title: "product-145",
    "sort-by": "max-price",
    "price-based": true,
    "construction-based": ["iran"],
  };
  const handleSearch = (query: string) => {
    console.log("در حال جستجو برای:", query);
  };

  const OnCreate = (index: number | null) => {
    console.log("Add OnCreate", index);
    setCreateIndex();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">List</h1>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <Button
          onClick={OnCreate}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
          </svg>
          Add user
        </Button>
      </div>

      <DataTable
        tableHead={tableHead}
        data={table_data}
        handleSearch={handleSearch}
        tableFilters={table_filter}
        filterData={filterData}
        setFilterData={setFilterData}
        updateDialogConfigs={updateDialogConfigs}
        existingData={existingData}
      />

      <CreateDialog
        open={createIndex !== null}
        onClose={() => setCreateIndex(null)}
        onConfirm={() => {
          if (createIndex !== null) OnCreate?.(createIndex);
          setCreateIndex(null);
        }}
        configs={createDialogConfigs}
      />
    </div>
  );
};

export default BuyPage;
