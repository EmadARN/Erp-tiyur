import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { ProductionExport, KernelData } from "./productionExportType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "شناسه", row_id: "id", type: "string" },
    { columnName: "محصول", row_id: "product", type: "string" },
    { columnName: "واحد تحویل گیرنده", row_id: "receiver_delivery_unit", type: "string" },
    { columnName: "وزن", row_id: "product_information.weight", type: "number" },
    { columnName: "تعداد", row_id: "product_information.number", type: "number" },
    { columnName: "تاریخ ایجاد", row_id: "create.date", type: "string" },
    { columnName: "وضعیت تأیید", row_id: "is_verified_by_receiver_delivery_unit_user.status", type: "boolean" },
    { columnName: "صاحب محصول سری تولید", row_id: "production_series.product_owner", type: "number" },
    { columnName: "وضعیت سری تولید", row_id: "production_series.status", type: "string" },
];

export function getCreateDialogConfigs({ products, receiver_delivery_units, product_owners, users, statuses }: KernelData): ConfigItem[] {
    return [
        {
            name: "product",
            label: "محصول",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "receiver_delivery_unit",
            label: "واحد تحویل گیرنده",
            type: "select-box",
            options: receiver_delivery_units,
            defaultValue: receiver_delivery_units?.[0]?.value,
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

export function getUpdateDialogConfigs({ products, receiver_delivery_units, product_owners, users, statuses }: KernelData): ConfigItem[] {
    return [
        {
            name: "product",
            label: "محصول",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "receiver_delivery_unit",
            label: "واحد تحویل گیرنده",
            type: "select-box",
            options: receiver_delivery_units,
            defaultValue: receiver_delivery_units?.[0]?.value,
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
            name: "is_verified_by_receiver_delivery_unit_user.status",
            label: "وضعیت تأیید",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "is_verified_by_receiver_delivery_unit_user.user_date.date",
            label: "تاریخ تأیید",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "is_verified_by_receiver_delivery_unit_user.user_date.user",
            label: "کاربر تأییدکننده",
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

export const updateDialogDocs: DeepPartial<ProductionExport> = {
    id: "462",
    product: "",
    receiver_delivery_unit: "",
    product_information: {
        weight: 0,
        number: 0,
    },
    create: {
        date: "2025-08-14 10:26",
        user: "",
    },
    is_verified_by_receiver_delivery_unit_user: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
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
        name: "product",
        label: "محصول",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی محصول",
        defaultValue: "",
    },
    {
        name: "receiver_delivery_unit",
        label: "واحد تحویل گیرنده",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی واحد تحویل گیرنده",
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
        name: "create__date",
        label: "تاریخ ایجاد",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "is_verified_by_receiver_delivery_unit_user__status",
        label: "وضعیت تأیید",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "production_series__product_owner",
        label: "صاحب محصول سری تولید",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی صاحب محصول",
        defaultValue: "",
    },
    {
        name: "production_series__status",
        label: "وضعیت سری تولید",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "pending",
    },
];