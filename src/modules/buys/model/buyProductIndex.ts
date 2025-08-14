import type {
  ConfigItem,
  TableColumn,
  TableFilter,
} from "@/modules/shared/types";
import type { BuyProduct, KernelData } from "./buysProduct";

// A utility type to make all properties of an object, including nested ones, optional.
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },

  // car info
  // Note: row_id uses a dot notation path. A robust solution would involve a type-safe path generator.
  { columnName: "Car", row_id: "car.car.car_number", type: "string" },
  { columnName: "Driver", row_id: "car.driver.contact.name", type: "string" },

  // order info
  {
    columnName: "Agriculture",
    row_id: "order_information.agriculture.name",
    type: "string",
  },
  {
    columnName: "Product Owner",
    row_id: "order_information.product_owner.contact.name",
    type: "string",
  },
  {
    columnName: "Slaughter Type",
    row_id: "order_information.slaughter_type",
    type: "string",
  },
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
    {
      name: "required_weight",
      label: "Required Weight",
      type: "int-input",
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
      type: "int-input",
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
      type: "int-input",
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
      name: "verified.description",
      label: "Verified Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "verified.status",
      label: "Verified Status",
      type: "switch",
      defaultValue: false,
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
      name: "received.description",
      label: "Received Description",
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
      name: "finished.description",
      label: "Finished Description",
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
      name: "done.description",
      label: "Done Description",
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
      name: "cancelled.description",
      label: "Cancelled Description",
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
    // Price fields
    {
      name: "price.purchase_price_per_unit",
      label: "Purchase Price per Unit",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "price.cost_price",
      label: "Cost Price",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "price.transportation_price",
      label: "Transportation Price",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
  ];
}

export const updateDialogDocs: DeepPartial<BuyProduct> = {
  id: "1761",
  car: {
    car: "string",
    driver: "string",
  },
  order_information: {
    agriculture: "string",
    product_owner: "string",
    slaughter_type: "Slaughterhouse delivery",
    order_type: "Purchase commission by the product owner",
    product: "string",
  },
  required_weight: 0,
  required_number: 0,
  weight: 0,
  quality: "string",
  status: "pending for verified",
  create: {
    date: "2025-08-12 12:44",
    user: "string",
  },
  verified: {
    user_date: {
      date: "2025-08-12 12:44",
      user: "string",
    },
    status: false,
    description: "",
  },
  received: {
    user_date: {
      date: "2025-08-12 12:44",
      user: "string",
    },
    status: false,
    description: "",
  },
  finished: {
    user_date: {
      date: "2025-08-12 12:44",
      user: "string",
    },
    status: false,
    description: "",
  },
  done: {
    user_date: {
      date: "2025-08-12 12:44",
      user: "string",
    },
    status: false,
    description: "",
  },
  cancelled: {
    user_date: {
      date: "2025-08-12 12:44",
      user: "string",
    },
    status: false,
    description: "",
  },
  price: {
    purchase_price_per_unit: 0,
    cost_price: 0,
    transportation_price: 0,
  },
};

export const tableFilter: TableFilter[] = [
  {
    name: "price__purchase_price_per_unit",
    label: "Purchase Price per Unit (Toman)",
    type: "range",
    min: 0,
    max: 1000000,
    step: 100,
    defaultValue: [0, 500000],
  },
  {
    name: "price__cost_price",
    label: "Cost Price (Toman)",
    type: "range",
    min: 0,
    max: 1000000,
    step: 100,
    defaultValue: [0, 300000],
  },
  {
    name: "price__transportation_price",
    label: "Transportation Price (Toman)",
    type: "range",
    min: 0,
    max: 1000000,
    step: 100,
    defaultValue: [0, 300000],
  },
  {
    name: "order_information__slaughter_type",
    label: "Slaughter Type",
    type: "select-box",
    options: [
      { label: "Slaughterhouse delivery", value: "Slaughterhouse delivery" },
      { label: "On-site slaughter", value: "On-site slaughter" },
    ],
    defaultValue: "Slaughterhouse delivery",
  },
  {
    name: "order_information__order_type",
    label: "Order Type",
    type: "select-box",
    options: [
      {
        label: "Purchase commission by the product owner",
        value: "Purchase commission by the product owner",
      },
      { label: "Direct purchase", value: "Direct purchase" },
    ],
    defaultValue: "Purchase commission by the product owner",
  },
  {
    name: "status",
    label: "Status",
    type: "select-box",
    options: [
      { label: "pending for verified", value: "pending for verified" },
      { label: "verified", value: "verified" },
      { label: "received", value: "received" },
      { label: "finished", value: "finished" },
      { label: "done", value: "done" },
      { label: "cancelled", value: "cancelled" },
    ],
    defaultValue: "pending for verified",
  },
  {
    name: "car__car",
    label: "Car",
    type: "autocomplete",
    options: [], // Populate dynamically from API
    placeholder: "Search car",
    defaultValue: "",
  },
  {
    name: "car__driver",
    label: "Driver",
    type: "autocomplete",
    options: [], // Populate dynamically from API
    placeholder: "Search driver",
    defaultValue: "",
  },
  {
    name: "order_information__product",
    label: "Product",
    type: "autocomplete",
    options: [], // Populate dynamically from API
    placeholder: "Search product",
    defaultValue: "",
  },
  {
    name: "order_information__product_owner",
    label: "Product Owner",
    type: "autocomplete",
    options: [], // Populate dynamically from API
    placeholder: "Search product owner",
    defaultValue: "",
  },
  {
    name: "order_information__agriculture",
    label: "Agriculture",
    type: "autocomplete",
    options: [], // Populate dynamically from API
    placeholder: "Search agriculture",
    defaultValue: "",
  },
  {
    name: "required_weight",
    label: "Required Weight",
    type: "range",
    min: 0,
    max: 10000,
    step: 10,
    defaultValue: [0, 5000],
  },
  {
    name: "required_number",
    label: "Required Number",
    type: "range",
    min: 0,
    max: 1000,
    step: 1,
    defaultValue: [0, 500],
  },
  {
    name: "weight",
    label: "Weight",
    type: "range",
    min: 0,
    max: 10000,
    step: 10,
    defaultValue: [0, 5000],
  },
  {
    name: "quality",
    label: "Quality",
    type: "autocomplete",
    options: [], // Populate dynamically from API
    placeholder: "Search quality",
    defaultValue: "",
  },
  {
    name: "create__date",
    label: "Create Date",
    type: "range-date",
    defaultValue: ["2025-01-01", "2025-12-31"],
  },
  {
    name: "verified__status",
    label: "Verified Status",
    type: "boolean",
    defaultValue: false,
  },
  {
    name: "received__status",
    label: "Received Status",
    type: "boolean",
    defaultValue: false,
  },
  {
    name: "finished__status",
    label: "Finished Status",
    type: "boolean",
    defaultValue: false,
  },
  {
    name: "done__status",
    label: "Done Status",
    type: "boolean",
    defaultValue: false,
  },
  {
    name: "cancelled__status",
    label: "Cancelled Status",
    type: "boolean",
    defaultValue: false,
  },
];
