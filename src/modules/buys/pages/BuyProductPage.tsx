import { useEffect, useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import type { TableColumn, TableFilter } from "@/modules/shared/types";
import {
  useGetBuyProductDetailsMutation,
  useGetBuyProductQuery,
  usePostBuyProductMutation,
  usePatchBuyProductMutation,
  useDeleteBuyProductMutation,
} from "../api/buyProductApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
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
  { columnName: "ID", row_id: "id", type: "string" },

  // car info
  { columnName: "Car", row_id: "car.car", type: "string" },
  { columnName: "Driver", row_id: "car.driver", type: "string" },

  // order info
  {
    columnName: "Agriculture",
    row_id: "order_information.agriculture",
    type: "string",
  },
  {
    columnName: "Product Owner",
    row_id: "order_information.product_owner",
    type: "string",
  },
  {
    columnName: "Slaughter Type",
    row_id: "order_information.slaughter_type",
    type: "string",
  },
  // {
  //   columnName: "Order Type",
  //   row_id: "order_information.order_type",
  //   type: "string",
  // },
  // {
  //   columnName: "Product",
  //   row_id: "order_information.product",
  //   type: "string",
  // },

  // // numeric fields
  // {
  //   columnName: "Required Weight",
  //   row_id: "required_weight",
  //   type: "number",
  // },
  // {
  //   columnName: "Required Number",
  //   row_id: "required_number",
  //   type: "number",
  // },
  // { columnName: "Weight", row_id: "weight", type: "number" },

  // // quality & status
  // { columnName: "Quality", row_id: "quality", type: "string" },
  // {
  //   columnName: "Status",
  //   row_id: "status",
  //   type: "string",
  //   options: ["pending for verified", "approved", "rejected"],
  // },

  // // create info
  // { columnName: "Created Date", row_id: "create.date", type: "date" },
  // { columnName: "Created By", row_id: "create.user", type: "string" },

  // // verified
  // {
  //   columnName: "Verified Date",
  //   row_id: "verified.user_date.date",
  //   type: "date",
  // },
  // {
  //   columnName: "Verified By",
  //   row_id: "verified.user_date.user",
  //   type: "string",
  // },
  // {
  //   columnName: "Verified Status",
  //   row_id: "verified.status",
  //   type: "boolean",
  // },
  // {
  //   columnName: "Verified Description",
  //   row_id: "verified.description",
  //   type: "string",
  // },

  // // received
  // {
  //   columnName: "Received Date",
  //   row_id: "received.user_date.date",
  //   type: "date",
  // },
  // {
  //   columnName: "Received By",
  //   row_id: "received.user_date.user",
  //   type: "string",
  // },
  // {
  //   columnName: "Received Status",
  //   row_id: "received.status",
  //   type: "boolean",
  // },
  // {
  //   columnName: "Received Description",
  //   row_id: "received.description",
  //   type: "string",
  // },

  // // finished
  // {
  //   columnName: "Finished Date",
  //   row_id: "finished.user_date.date",
  //   type: "date",
  // },
  // {
  //   columnName: "Finished By",
  //   row_id: "finished.user_date.user",
  //   type: "string",
  // },
  // {
  //   columnName: "Finished Status",
  //   row_id: "finished.status",
  //   type: "boolean",
  // },
  // {
  //   columnName: "Finished Description",
  //   row_id: "finished.description",
  //   type: "string",
  // },

  // // done
  // { columnName: "Done Date", row_id: "done.user_date.date", type: "date" },
  // { columnName: "Done By", row_id: "done.user_date.user", type: "string" },
  // { columnName: "Done Status", row_id: "done.status", type: "boolean" },
  // {
  //   columnName: "Done Description",
  //   row_id: "done.description",
  //   type: "string",
  // },

  // // cancelled
  // {
  //   columnName: "Cancelled Date",
  //   row_id: "cancelled.user_date.date",
  //   type: "date",
  // },
  // {
  //   columnName: "Cancelled By",
  //   row_id: "cancelled.user_date.user",
  //   type: "string",
  // },
  // {
  //   columnName: "Cancelled Status",
  //   row_id: "cancelled.status",
  //   type: "boolean",
  // },
  // {
  //   columnName: "Cancelled Description",
  //   row_id: "cancelled.description",
  //   type: "string",
  // },

  // // prices
  // {
  //   columnName: "Purchase Price per Unit",
  //   row_id: "price.purchase_price_per_unit",
  //   type: "number",
  // },
  // { columnName: "Cost Price", row_id: "price.cost_price", type: "number" },
  // {
  //   columnName: "Transportation Price",
  //   row_id: "price.transportation_price",
  //   type: "number",
  // },
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


//config for add buy product
const createDialogConfigs = [

  {
    name: "car.car",
    label: "Car",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "car.driver",
    label: "Driver",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "order_information.agriculture",
    label: "Agriculture",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "order_information.product_owner",
    label: "Product Owner",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "order_information.slaughter_type",
    label: "Slaughter Type",
    type: "select-box",
    options: ["Slaughterhouse delivery"],
    defaultValue: "Slaughterhouse delivery",
  },
  {
    name: "order_information.order_type",
    label: "Order Type",
    type: "select-box",
    options: ["Purchase commission by the product owner"],
    defaultValue: "Purchase commission by the product owner",
  },
  {
    name: "order_information.product",
    label: "Product",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "required_weight",
    label: "Required Weight",
    type: "number-input",
    defaultValue: 0,
  },
  {
    name: "required_number",
    label: "Required Number",
    type: "number-input",
    defaultValue: 0,
  },
  {
    name: "weight",
    label: "Weight",
    type: "number-input",
    defaultValue: 1,
  },
  {
    name: "quality",
    label: "Quality",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "status",
    label: "Status",
    type: "select-box",
    options: [
      "pending for verified",
      "verified",
      "received",
      "finished",
      "done",
      "cancelled",
    ],
    defaultValue: "pending for verified",
  },
  {
    name: "price.purchase_price_per_unit",
    label: "Purchase Price Per Unit",
    type: "number-input",
    defaultValue: 1,
  },
  {
    name: "price.cost_price",
    label: "Cost Price",
    type: "number-input",
    defaultValue: 0,
  },
  {
    name: "price.transportation_price",
    label: "Transportation Price",
    type: "number-input",
    defaultValue: 0,
  },
  // برای فیلدهای تاریخ و user که فانکشن هستن یا داده‌های تو در تو پیچیده، معمولاً یا حذف می‌کنیم یا فقط user‌ها رو اضافه می‌کنیم
  {
    name: "create.user",
    label: "Create User",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "verified.status",
    label: "Verified Status",
    type: "switch",
    defaultValue: false,
  },
  {
    name: "verified.description",
    label: "Verified Description",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "received.status",
    label: "Received Status",
    type: "switch",
    defaultValue: false,
  },
  {
    name: "received.description",
    label: "Received Description",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "finished.status",
    label: "Finished Status",
    type: "switch",
    defaultValue: false,
  },
  {
    name: "finished.description",
    label: "Finished Description",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "done.status",
    label: "Done Status",
    type: "switch",
    defaultValue: false,
  },
  {
    name: "done.description",
    label: "Done Description",
    type: "string-input",
    defaultValue: "",
  },
  {
    name: "cancelled.status",
    label: "Cancelled Status",
    type: "switch",
    defaultValue: false,
  },
  {
    name: "cancelled.description",
    label: "Cancelled Description",
    type: "string-input",
    defaultValue: "",
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

const BuyProductPage = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filterData, setFilterData] = useState<boolean>([]);
  const [createIndex, setCreateIndex] = useState<number | null>(null);

  // دریافت داده‌های GET
  const [getBuyProductDetails] = useGetBuyProductDetailsMutation();
  const { data: tableData, error, isLoading } = useGetBuyProductQuery();
  const tableData2 = Array.isArray(tableData?.data) ? tableData.data : [];
  console.log("data", tableData);
  // هوک‌های mutation برای POST, PATCH, DELETE
  const [postBuyProduct] = usePostBuyProductMutation();
  const [patchBuyProduct] = usePatchBuyProductMutation();
  const [deleteBuyProduct] = useDeleteBuyProductMutation();

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

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!tableData || tableData.length === 0) {
    return <div className="p-4 text-center">No data found</div>;
  }

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
        data={tableData2}
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
        onConfirm={(data) => {
          console.log("dadadadadad",data)
          if (createIndex !== null) OnCreate?.(createIndex);
          setCreateIndex(null);
        }}
        configs={createDialogConfigs}
      />
    </div>
  );
};

export default BuyProductPage;
