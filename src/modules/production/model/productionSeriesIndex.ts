import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { ProductionSeries, KernelData } from "./productionSeriesType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "شناسه", row_id: "id", type: "string" },
    { columnName: "صاحب محصول", row_id: "product_owner", type: "number" },
    { columnName: "وضعیت", row_id: "status", type: "string" },
    { columnName: "تاریخ ایجاد", row_id: "create.date", type: "string" },
    { columnName: "کاربر ایجادکننده", row_id: "create.user", type: "string" },
    { columnName: "تاریخ شروع", row_id: "start.date", type: "string" },
    { columnName: "کاربر شروع‌کننده", row_id: "start.user", type: "string" },
    { columnName: "تاریخ اتمام", row_id: "finish.date", type: "string" },
    { columnName: "کاربر اتمام‌کننده", row_id: "finish.user", type: "string" },
];

export function getCreateDialogConfigs({ product_owners }: KernelData): ConfigItem[] {
    return [
        {
            name: "product_owner",
            label: "صاحب محصول",
            type: "select-box",
            options: product_owners,
            defaultValue: product_owners?.[0]?.value,
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs({ product_owners, users, statuses }: KernelData): ConfigItem[] {
    return [
        {
            name: "product_owner",
            label: "صاحب محصول",
            type: "select-box",
            options: product_owners,
            defaultValue: product_owners?.[0]?.value,
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
            name: "start.date",
            label: "تاریخ شروع",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "start.user",
            label: "کاربر شروع‌کننده",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "finish.date",
            label: "تاریخ اتمام",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "finish.user",
            label: "کاربر اتمام‌کننده",
            type: "select-box",
            options: users,
            defaultValue: users?.[0]?.value,
            required: false,
        },
        {
            name: "status",
            label: "وضعیت",
            type: "select-box",
            options: statuses,
            defaultValue: statuses?.[0]?.value || "pending",
            required: true,
        },
    ];
}

export const updateDialogDocs: DeepPartial<ProductionSeries> = {
    id: "221",
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
};

export const tableFilter: TableFilter[] = [
    {
        name: "product_owner",
        label: "صاحب محصول",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی صاحب محصول",
        defaultValue: "",
    },
    {
        name: "status",
        label: "وضعیت",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "pending",
    },
    {
        name: "create__date",
        label: "تاریخ ایجاد",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی تاریخ ایجاد",
        defaultValue: "",
    },
    {
        name: "start__date",
        label: "تاریخ شروع",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی تاریخ شروع",
        defaultValue: "",
    },
    {
        name: "finish__date",
        label: "تاریخ اتمام",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی تاریخ اتمام",
        defaultValue: "",
    },
];