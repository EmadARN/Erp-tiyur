import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { ProductionImportFromWarehouse, KernelData } from "./productionImportFromWarehouseType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "شناسه", row_id: "id", type: "string" },
    { columnName: "سطح", row_id: "level", type: "number" },
    { columnName: "واحد انبار", row_id: "product_description.warehouse_unit", type: "string" },
    { columnName: "محصول", row_id: "product_description.product.product", type: "number" },
    { columnName: "صاحب محصول", row_id: "product_description.product.product_owner", type: "number" },
    { columnName: "وزن", row_id: "product_information.weight", type: "number" },
    { columnName: "تعداد", row_id: "product_information.number", type: "number" },
    { columnName: "وضعیت تأیید", row_id: "is_verified.status", type: "boolean" },
    { columnName: "وضعیت برنامه‌ریزی", row_id: "is_planned.status", type: "boolean" },
    { columnName: "وضعیت لغو", row_id: "is_cancelled.status", type: "boolean" },
    { columnName: "وضعیت سری تولید", row_id: "production_series.status", type: "string" },
];

export function getCreateDialogConfigs({ warehouse_units, products, product_owners, users, statuses }: KernelData): ConfigItem[] {
    return [
        {
            name: "product_description.warehouse_unit",
            label: "واحد انبار",
            type: "select-box",
            options: warehouse_units,
            defaultValue: warehouse_units?.[0]?.value,
            required: true,
        },
        {
            name: "product_description.product.product",
            label: "محصول",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "product_description.product.product_owner",
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
            name: "production_series.product_owner",
            label: "صاحب محصول سری تولید",
            type: "select-box",
            options: product_owners,
            defaultValue: product_owners?.[0]?.value,
            required: true,
        },
        {
            name: "production_series.create.date",
            label: "تاریخ ایجاد سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "production_series.create.user",
            label: "کاربر ایجادکننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "production_series.start.date",
            label: "تاریخ شروع سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "production_series.start.user",
            label: "کاربر شروع‌کننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "production_series.finish.date",
            label: "تاریخ اتمام سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "production_series.finish.user",
            label: "کاربر اتمام‌کننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "production_series.status",
            label: "وضعیت سری تولید",
            type: "select-box",
            options: statuses,
            defaultValue: statuses?.[0]?.value || "pending",
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs({ warehouse_units, products, product_owners, users, statuses }: KernelData): ConfigItem[] {
    return [
        {
            name: "level",
            label: "سطح",
            type: "int-input",
            defaultValue: 1,
            required: true,
        },
        {
            name: "product_description.warehouse_unit",
            label: "واحد انبار",
            type: "select-box",
            options: warehouse_units,
            defaultValue: warehouse_units?.[0]?.value,
            required: true,
        },
        {
            name: "product_description.product.product",
            label: "محصول",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "product_description.product.product_owner",
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
            name: "is_verified.status",
            label: "وضعیت تأیید",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "is_verified.user_date.date",
            label: "تاریخ تأیید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "is_verified.user_date.user",
            label: "کاربر تأیید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "is_planned.status",
            label: "وضعیت برنامه‌ریزی",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "is_planned.user_date.date",
            label: "تاریخ برنامه‌ریزی",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "is_planned.user_date.user",
            label: "کاربر برنامه‌ریزی",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "is_cancelled.status",
            label: "وضعیت لغو",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "is_cancelled.user_date.date",
            label: "تاریخ لغو",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "is_cancelled.user_date.user",
            label: "کاربر لغو",
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
            name: "production_start_date.date",
            label: "تاریخ شروع تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "production_start_date.user",
            label: "کاربر شروع تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "production_finished_date.date",
            label: "تاریخ اتمام تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "production_finished_date.user",
            label: "کاربر اتمام تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "production_series.product_owner",
            label: "صاحب محصول سری تولید",
            type: "select-box",
            options: product_owners,
            defaultValue: product_owners?.[0]?.value,
            required: true,
        },
        {
            name: "production_series.create.date",
            label: "تاریخ ایجاد سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "production_series.create.user",
            label: "کاربر ایجادکننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "production_series.start.date",
            label: "تاریخ شروع سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "production_series.start.user",
            label: "کاربر شروع‌کننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "production_series.finish.date",
            label: "تاریخ اتمام سری تولید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "production_series.finish.user",
            label: "کاربر اتمام‌کننده سری تولید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: true,
        },
        {
            name: "production_series.status",
            label: "وضعیت سری تولید",
            type: "select-box",
            options: statuses,
            defaultValue: statuses?.[0]?.value || "pending",
            required: true,
        },
    ];
}

export const updateDialogDocs: DeepPartial<ProductionImportFromWarehouse> = {
    id: "159",
    level: 1,
    product_description: {
        warehouse_unit: "",
        product: {
            product: 0,
            product_owner: 0,
        },
    },
    product_information: {
        weight: 0,
        number: 0,
    },
    is_verified: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
    },
    is_planned: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
    },
    is_cancelled: {
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
    production_start_date: {
        date: "2025-08-14 10:26",
        user: "",
    },
    production_finished_date: {
        date: "2025-08-14 10:26",
        user: "",
    },
    production_series: {
        create: {
            date: "2025-08-14 10:26",
            user: "",
        },
        start: {
            date: "2025-08-14 10:26",
            user: "",
        },
        finish: {
            date: "2025-08-14 10:26",
            user: "",
        },
        product_owner: 0,
        status: "pending",
    },
};

export const tableFilter: TableFilter[] = [
    {
        name: "product_description__warehouse_unit",
        label: "واحد انبار",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی واحد انبار",
        defaultValue: "",
    },
    {
        name: "product_description__product__product",
        label: "محصول",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی محصول",
        defaultValue: "",
    },
    {
        name: "product_description__product__product_owner",
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
        name: "is_verified__status",
        label: "وضعیت تأیید",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "is_planned__status",
        label: "وضعیت برنامه‌ریزی",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "is_cancelled__status",
        label: "وضعیت لغو",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "production_series__status",
        label: "وضعیت سری تولید",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "pending",
    },
];