import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { ProductionReturnProduct, KernelData } from "./productionReturnProductType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "شناسه", row_id: "id", type: "string" },
    { columnName: "واحد تحویل گیرنده", row_id: "receiver_delivery_unit", type: "string" },
    { columnName: "محصول", row_id: "product.product", type: "number" },
    { columnName: "صاحب محصول", row_id: "product.product_owner", type: "number" },
    { columnName: "وزن", row_id: "product_information.weight", type: "number" },
    { columnName: "تعداد", row_id: "product_information.number", type: "number" },
    { columnName: "نوع بازگشت", row_id: "return_type", type: "string" },
    { columnName: "قابل استفاده", row_id: "is_useful", type: "boolean" },
    { columnName: "بسته‌بندی مجدد", row_id: "is_repack", type: "boolean" },
    { columnName: "وضعیت تأیید", row_id: "verified.status", type: "boolean" },
    { columnName: "وضعیت سری تولید", row_id: "production_series.status", type: "string" },
];

export function getCreateDialogConfigs({ receiver_delivery_units, products, product_owners, return_types }: KernelData): ConfigItem[] {
    return [
        {
            name: "receiver_delivery_unit",
            label: "واحد تحویل گیرنده",
            type: "select-box",
            options: receiver_delivery_units,
            defaultValue: receiver_delivery_units?.[0]?.value,
            required: true,
        },
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
            name: "return_type",
            label: "نوع بازگشت",
            type: "select-box",
            options: return_types,
            defaultValue: return_types?.[0]?.value || "return from production",
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs({ receiver_delivery_units, products, product_owners, return_types, users, statuses }: KernelData): ConfigItem[] {
    return [
        {
            name: "receiver_delivery_unit",
            label: "واحد تحویل گیرنده",
            type: "select-box",
            options: receiver_delivery_units,
            defaultValue: receiver_delivery_units?.[0]?.value,
            required: true,
        },
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
            name: "return_type",
            label: "نوع بازگشت",
            type: "select-box",
            options: return_types,
            defaultValue: return_types?.[0]?.value || "return from production",
            required: true,
        },
        {
            name: "create.date",
            label: "تاریخ ایجاد",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "create.user",
            label: "کاربر ایجادکننده",
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
            label: "کاربر تأیید",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "is_useful",
            label: "قابل استفاده",
            type: "switch",
            defaultValue: true,
            required: false,
        },
        {
            name: "is_repack",
            label: "بسته‌بندی مجدد",
            type: "switch",
            defaultValue: false,
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

export const updateDialogDocs: DeepPartial<ProductionReturnProduct> = {
    id: "468",
    receiver_delivery_unit: "",
    product: {
        product: 0,
        product_owner: 0,
    },
    product_information: {
        weight: 0,
        number: 0,
    },
    return_type: "return from production",
    create: {
        date: "2025-08-14 10:26",
        user: "",
    },
    verified: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
    },
    is_useful: true,
    is_repack: false,
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
        name: "receiver_delivery_unit",
        label: "واحد تحویل گیرنده",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی واحد تحویل گیرنده",
        defaultValue: "",
    },
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
        name: "return_type",
        label: "نوع بازگشت",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "return from production",
    },
    {
        name: "is_useful",
        label: "قابل استفاده",
        type: "boolean",
        defaultValue: true,
    },
    {
        name: "is_repack",
        label: "بسته‌بندی مجدد",
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
        name: "production_series__status",
        label: "وضعیت سری تولید",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "pending",
    },
];