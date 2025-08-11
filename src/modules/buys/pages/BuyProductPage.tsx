import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import type { TableColumn, TableFilter } from "@/modules/shared/types";
import {
  useGetBuyProductDetailsQuery,
  useGetBuyProductQuery,
  usePostBuyProductMutation,
  usePatchBuyProductMutation,
  useDeleteBuyProductMutation,
} from "../api/buyProductApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";

const BuyProductPage = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filterData, setFilterData] = useState<boolean>([]);
  const [createIndex, setCreateIndex] = useState<number | null>(null);

  // دریافت داده‌های GET
  const { data, error, isLoading } = useGetBuyProductQuery();
  const { data: data2, error: error2 } = useGetBuyProductDetailsQuery();

  // هوک‌های mutation برای POST, PATCH, DELETE
  const [postBuyProduct] = usePostBuyProductMutation();
  const [patchBuyProduct] = usePatchBuyProductMutation();
  const [deleteBuyProduct] = useDeleteBuyProductMutation();

  // // داده‌های نمونه برای تست
  // const samplePostData = { id: 123, name: "emad" };
  // const samplePatchData = { id: 123, name: "emad updated" };
  // const sampleDeleteId = 123;

  // // توابع تست
  // const testPost = async () => {
  //   try {
  //     const res = await postBuyProduct(samplePostData).unwrap();
  //     console.log("POST response:", res);
  //   } catch (err) {
  //     console.error("POST error:", err);
  //   }
  // };

  // const testPatch = async () => {
  //   try {
  //     const res = await patchBuyProduct(samplePatchData).unwrap();
  //     console.log("PATCH response:", res);
  //   } catch (err) {
  //     console.error("PATCH error:", err);
  //   }
  // };

  // const testDelete = async () => {
  //   try {
  //     const res = await deleteBuyProduct(sampleDeleteId).unwrap();
  //     console.log("DELETE response:", res);
  //   } catch (err) {
  //     console.error("DELETE error:", err);
  //   }
  // };

  const table_data = [
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
      defaultValue: [100, 500],
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

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Buy", href: "/dashboard/buy" },
    { label: "Buy Product" },
  ];

  const handleSearch = (query: string) => {
    console.log("در حال جستجو برای:", query);
  };

  const OnCreate = (index: number | null) => {
    console.log("Add OnCreate", index);
    setCreateIndex(index);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <PageHeader
        title="Buy Product"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => OnCreate(1)}
        createLabel="Add Buy Product"
      />

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

export default BuyProductPage;
