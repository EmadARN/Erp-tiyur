import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { PoultryCuttingImport, KernelData } from "./poultryCuttingImportType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "شناسه", row_id: "id", type: "string" },
    { columnName: "محصول", row_id: "product.product", type: "number" },
    { columnName: "صاحب محصول", row_id: "product.product_owner", type: "number" },
    { columnName: "وزن", row_id: "product_information.weight", type: "number" },
    { columnName: "تعداد", row_id: "product_information.number", type: "number" },
    { columnName: "وضعیت تولید", row_id: "production_status", type: "string" },
    { columnName: "واحد اعزام", row_id: "dispatch_unit", type: "string" },
    { columnName: "وضعیت اعزام", row_id: "dispatch.status", type: "boolean" },
    { columnName: "وضعیت تأیید", row_id: "verified.status", type: "boolean" },
    { columnName: "وضعیت لغو", row_id: "cancelled.status", type: "boolean" },
    { columnName: "تاریخ ایجاد", row_id: "create_date.date", type: "string" },
    { columnName: "وضعیت سری تولید", row_id: "poultry_cutting_production_series.status", type: "string" },
];

export function getCreateDialogConfigs({ products, product_owners, dispatch_units, users, statuses }: KernelData): ConfigItem[] {
    return [
        {
            name: "product.product",
            label: "محصول",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "product.product_owner",
            label: "صاحب محصول",
            type: "select-box",
            options: product_owners,
            defaultValue: product_owners?.[0]?.value,
            required: true,
        },
        {
            name: "product_information.weight",
            label: "وزن",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "product_information.number",
            label: "تعداد",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "dispatch_unit",
            label: "واحد اعزام",
            type: "select-box",
            options: dispatch_units,
            defaultValue: dispatch_units?.[0]?.value,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.product_owner",
            label: "صاحب محصول سری تولید",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.create.date",
            label: "تاریخ ایجاد سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.create.user",
            label: "کاربر ایجادکننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.start.date",
            label: "تاریخ شروع سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.start.user",
            label: "کاربر شروع‌کننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.finished.date",
            label: "تاریخ اتمام سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.finished.user",
            label: "کاربر اتمام‌کننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.status",
            label: "وضعیت سری تولید",
            type: "select-box",
            options: statuses,
            defaultValue: statuses?.[0]?.value || "pending",
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs({ products, product_owners, dispatch_units, users, statuses }: KernelData): ConfigItem[] {
    return [
        {
            name: "product.product",
            label: "محصول",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "product.product_owner",
            label: "صاحب محصول",
            type: "select-box",
            options: product_owners,
            defaultValue: product_owners?.[0]?.value,
            required: true,
        },
        {
            name: "product_information.weight",
            label: "وزن",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "product_information.number",
            label: "تعداد",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "production_status",
            label: "وضعیت تولید",
            type: "select-box",
            options: statuses,
            defaultValue: statuses?.[0]?.value || "pending",
            required: true,
        },
        {
            name: "dispatch_unit",
            label: "واحد اعزام",
            type: "select-box",
            options: dispatch_units,
            defaultValue: dispatch_units?.[0]?.value,
            required: true,
        },
        {
            name: "dispatch.status",
            label: "وضعیت اعزام",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "dispatch.user_date.date",
            label: "تاریخ اعزام",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "dispatch.user_date.user",
            label: "کاربر اعزام‌کننده",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "verified.status",
            label: "وضعیت تأیید",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "verified.user_date.date",
            label: "تاریخ تأیید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "verified.user_date.user",
            label: "کاربر تأییدکننده",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "cancelled.status",
            label: "وضعیت لغو",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "cancelled.user_date.date",
            label: "تاریخ لغو",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "cancelled.user_date.user",
            label: "کاربر لغوکننده",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "create_date.date",
            label: "تاریخ ایجاد",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "create_date.user",
            label: "کاربر ایجادکننده",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "poultry_cutting_production_series.product_owner",
            label: "صاحب محصول سری تولید",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.create.date",
            label: "تاریخ ایجاد سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.create.user",
            label: "کاربر ایجادکننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.start.date",
            label: "تاریخ شروع سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.start.user",
            label: "کاربر شروع‌کننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.finished.date",
            label: "تاریخ اتمام سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.finished.user",
            label: "کاربر اتمام‌کننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.status",
            label: "وضعیت سری تولید",
            type: "select-box",
            options: statuses,
            defaultValue: statuses?.[0]?.value || "pending",
            required: true,
        },
    ];
}

export const updateDialogDocs: DeepPartial<PoultryCuttingImport> = {
    id: "156",
    product: {
        product: 0,
        product_owner: 0,
    },
    product_information: {
        weight: 0,
        number: 0,
    },
    production_status: "pending",
    dispatch_unit: "",
    dispatch: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
    },
    verified: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
    },
    cancelled: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
    },
    create_date: {
        date: "2025-08-14 10:26",
        user: "",
    },
    poultry_cutting_production_series: {
        product_owner: "",
        create: {
            date: "2025-08-14 10:26",
            user: "",
        },
        start: {
            date: "2025-08-14 10:26",
            user: "",
        },
        finished: {
            date: "2025-08-14 10:26",
            user: "",
        },
        status: "pending",
    },
};

export const tableFilter: TableFilter[] = [
    {
        name: "product__product",
        label: "محصول",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی محصول",
        defaultValue: "",
    },
    {
        name: "product__product_owner",
        label: "صاحب محصول",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی صاحب محصول",
        defaultValue: "",
    },
    {
        name: "product_information__weight",
        label: "وزن",
        type: "range",
        min: 0,
        max: 1000,
        step: 1,
        defaultValue: [0, 500],
    },
    {
        name: "product_information__number",
        label: "تعداد",
        type: "range",
        min: 0,
        max: 1000,
        step: 1,
        defaultValue: [0, 500],
    },
    {
        name: "production_status",
        label: "وضعیت تولید",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "pending",
    },
    {
        name: "dispatch_unit",
        label: "واحد اعزام",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی واحد اعزام",
        defaultValue: "",
    },
    {
        name: "dispatch__status",
        label: "وضعیت اعزام",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "verified__status",
        label: "وضعیت تأیید",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "cancelled__status",
        label: "وضعیت لغو",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "create_date__date",
        label: "تاریخ ایجاد",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "poultry_cutting_production_series__status",
        label: "وضعیت سری تولید",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "pending",
    },
];