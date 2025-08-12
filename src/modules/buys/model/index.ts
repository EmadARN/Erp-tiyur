import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { KernelData } from "./buysTypes";

export const tableHead: TableColumn[] = [
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


export function getCreateDialogConfigs({
  cars,
  agriculture,
  drivers,
  owners,
  products,
}: KernelData): ConfigItem[] {
  return [
    {
      name: "car.car",
      label: "Car",
      type: "select-box",
      options: cars,
      defaultValue: cars?.[0]?.value,
      required: true,
    },
    {
      name: "car.driver",
      label: "Driver",
      type: "select-box",
      options: drivers,
      defaultValue: drivers?.[0]?.value,
      required: true,
    },
    {
      name: "order_information.agriculture",
      label: "Agriculture",
      type: "select-box",
      options: agriculture,
      defaultValue: agriculture?.[0]?.value,
      required: true,
    },
    {
      name: "order_information.product_owner",
      label: "Product Owner",
      type: "select-box",
      options: owners,
      defaultValue: owners?.[0]?.value,
      required: true,
    },
    {
      name: "order_information.slaughter_type",
      label: "Slaughter Type",
      type: "select-box",
      options: [
        { label: "Slaughterhouse delivery", value: "Slaughterhouse delivery" },
        { label: "Other type 1", value: "Other type 1" },
        { label: "Other type 2", value: "Other type 2" },
      ],
      defaultValue: "Slaughterhouse delivery",
      required: true,
    },
    {
      name: "order_information.order_type",
      label: "Order Type",
      type: "select-box",
      options: [
        { label: "Purchase commission by the product owner", value: "Purchase commission by the product owner" },
        { label: "Other order type 1", value: "Other order type 1" },
        { label: "Other order type 2", value: "Other order type 2" },
      ],
      defaultValue: "Purchase commission by the product owner",
      required: true,
    },
    {
      name: "order_information.product",
      label: "Product",
      type: "select-box",
      options: products,
      defaultValue: products?.[0]?.value,
      required: true,
    },
    {
      name: "required_weight",
      label: "Required Weight",
      type: "float-input",
      defaultValue: 0,
      required: true,
    },
    {
      name: "required_number",
      label: "Required Number",
      type: "int-input",
      defaultValue: 0,
      required: true,
    },
  ];
}

export function getUpdateDialogConfigs({
  cars,
  agriculture,
  drivers,
  owners,
  products,
}: KernelData): ConfigItem[] {
  return [
    // Car Info
    {
      name: "car.car",
      label: "Car",
      type: "select-box",
      options: cars,
      defaultValue: cars?.[0]?.value,
      required: true,
    },
    {
      name: "car.driver",
      label: "Driver",
      type: "select-box",
      options: drivers,
      defaultValue: drivers?.[0]?.value,
      required: true,
    },

    // Order Info
    {
      name: "order_information.agriculture",
      label: "Agriculture",
      type: "select-box",
      options: agriculture,
      defaultValue: agriculture?.[0]?.value,
      required: true,
    },
    {
      name: "order_information.product_owner",
      label: "Product Owner",
      type: "select-box",
      options: owners,
      defaultValue: owners?.[0]?.value,
      required: true,
    },
    {
      name: "order_information.slaughter_type",
      label: "Slaughter Type",
      type: "select-box",
      options: [
        { label: "Slaughterhouse delivery", value: "Slaughterhouse delivery" },
        { label: "Other type 1", value: "Other type 1" },
        { label: "Other type 2", value: "Other type 2" },
      ],
      defaultValue: "Slaughterhouse delivery",
      required: true,
    },
    {
      name: "order_information.order_type",
      label: "Order Type",
      type: "select-box",
      options: [
        {
          label: "Purchase commission by the product owner",
          value: "Purchase commission by the product owner",
        },
        { label: "Other order type 1", value: "Other order type 1" },
        { label: "Other order type 2", value: "Other order type 2" },
      ],
      defaultValue: "Purchase commission by the product owner",
      required: true,
    },
    {
      name: "order_information.product",
      label: "Product",
      type: "select-box",
      options: products,
      defaultValue: products?.[0]?.value,
      required: true,
    },

    // Required values
    {
      name: "required_weight",
      label: "Required Weight",
      type: "float-input",
      defaultValue: 0,
      required: true,
    },
    {
      name: "required_number",
      label: "Required Number",
      type: "int-input",
      defaultValue: 0,
      required: true,
    },
    {
      name: "weight",
      label: "Weight",
      type: "float-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "quality",
      label: "Quality",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "status",
      label: "Status",
      type: "select-box",
      options: [
        { label: "pending for verified", value: "pending for verified" },
        { label: "other status 1", value: "other status 1" },
      ],
      defaultValue: "pending for verified",
      required: true,
    },

    // Create info (readonly fields)
    {
      name: "create.date",
      label: "Create Date",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "create.user",
      label: "Create User",
      type: "string-input",
      defaultValue: "",
      required: false,
    },

    // Verified info
    {
      name: "verified.user_date.date",
      label: "Verified Date",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "verified.user_date.user",
      label: "Verified User",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "verified.status",
      label: "Verified Status",
      type: "switch", // فرض کردم نوع switch برای بولی مناسب است
      defaultValue: false,
      required: false,
    },
    {
      name: "verified.description",
      label: "Verified Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },

    // Received info
    {
      name: "received.user_date.date",
      label: "Received Date",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "received.user_date.user",
      label: "Received User",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "received.status",
      label: "Received Status",
      type: "switch",
      defaultValue: false,
      required: false,
    },
    {
      name: "received.description",
      label: "Received Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },

    // Finished info
    {
      name: "finished.user_date.date",
      label: "Finished Date",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "finished.user_date.user",
      label: "Finished User",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "finished.status",
      label: "Finished Status",
      type: "switch",
      defaultValue: false,
      required: false,
    },
    {
      name: "finished.description",
      label: "Finished Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },

    // Done info
    {
      name: "done.user_date.date",
      label: "Done Date",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "done.user_date.user",
      label: "Done User",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "done.status",
      label: "Done Status",
      type: "switch",
      defaultValue: false,
      required: false,
    },
    {
      name: "done.description",
      label: "Done Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },

    // Cancelled info
    {
      name: "cancelled.user_date.date",
      label: "Cancelled Date",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "cancelled.user_date.user",
      label: "Cancelled User",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "cancelled.status",
      label: "Cancelled Status",
      type: "switch",
      defaultValue: false,
      required: false,
    },
    {
      name: "cancelled.description",
      label: "Cancelled Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },

    // Price fields
    {
      name: "price.purchase_price_per_unit",
      label: "Purchase Price per Unit",
      type: "float-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "price.cost_price",
      label: "Cost Price",
      type: "float-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "price.transportation_price",
      label: "Transportation Price",
      type: "float-input",
      defaultValue: 0,
      required: false,
    },
  ];
}

export const updateDialogDocs = {
  "id": "1761",
  "car": {
    "car": "string",
    "driver": "string"
  },
  "order_information": {
    "agriculture": "string",
    "product_owner": "string",
    "slaughter_type": "Slaughterhouse delivery",
    "order_type": "Purchase commission by the product owner",
    "product": "string"
  },
  "required_weight": 0,
  "required_number": 0,
  "weight": 0,
  "quality": "string",
  "status": "pending for verified",
  "create": {
    "date": "2025-08-12 12:44",
    "user": "string"
  },
  "verified": {
    "user_date": {
      "date": "2025-08-12 12:44",
      "user": "string"
    },
    "status": false,
    "description": ""
  },
  "received": {
    "user_date": {
      "date": "2025-08-12 12:44",
      "user": "string"
    },
    "status": false,
    "description": ""
  },
  "finished": {
    "user_date": {
      "date": "2025-08-12 12:44",
      "user": "string"
    },
    "status": false,
    "description": ""
  },
  "done": {
    "user_date": {
      "date": "2025-08-12 12:44",
      "user": "string"
    },
    "status": false,
    "description": ""
  },
  "cancelled": {
    "user_date": {
      "date": "2025-08-12 12:44",
      "user": "string"
    },
    "status": false,
    "description": ""
  },
  "price": {
    "purchase_price_per_unit": 0,
    "cost_price": 0,
    "transportation_price": 0
  }
}


export const tableFilter: TableFilter[] = [
  {
    name: "price__purchase_price_per_unit",
    label: "Purchase Price per Unit (Toman)",
    type: "range",
    min: 0,
    max: 10000,
    step: 100,
    defaultValue: [0, 5000],
  },
  {
    name: "order_information__slaughter_type",
    label: "Slaughter Type",
    type: "select-box",
    options: [
      "Slaughterhouse delivery",
      // بقیه گزینه‌ها
    ],
    defaultValue: "Slaughterhouse delivery",
  },
  {
    name: "order_information__order_type",
    label: "Order Type",
    type: "select-box",
    options: [
      "Purchase commission by the product owner",
      // گزینه‌های دیگر
    ],
    defaultValue: "Purchase commission by the product owner",
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
    name: "car__car",
    label: "Car",
    type: "autocomplete",
    options: [], // لیست ماشین‌ها
    placeholder: "Search car",
    defaultValue: "",
  },
  {
    name: "car__driver",
    label: "Driver",
    type: "autocomplete",
    options: [], // لیست راننده‌ها
    placeholder: "Search driver",
    defaultValue: "",
  },
  {
    name: "create__date",
    label: "Create Date",
    type: "date-range",
    defaultValue: ["2025-01-01", "2025-12-31"],
  },
  {
    name: "required_weight",
    label: "Required Weight",
    type: "range",
    min: 0,
    max: 1000,
    step: 10,
    defaultValue: [0, 1000],
  },
  {
    name: "quality",
    label: "Quality",
    type: "autocomplete",
    options: [], // مقادیر کیفیت
    placeholder: "Search quality",
    defaultValue: "",
  },
  {
    name: "price__transportation_price",
    label: "Transportation Price",
    type: "range",
    min: 0,
    max: 10000,
    step: 100,
    defaultValue: [0, 3000],
  },
];

