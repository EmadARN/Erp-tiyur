import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { PlanningSeries, KernelData } from "./planningSeriesType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "شناسه", row_id: "id", type: "string" },
    { columnName: "تاریخ ایجاد", row_id: "create.date", type: "string" },
    { columnName: "کاربر ایجادکننده", row_id: "create.user", type: "string" },
    { columnName: "وضعیت اتمام", row_id: "is_finished", type: "boolean" },
];

export function getCreateDialogConfigs({ users }: KernelData): ConfigItem[] {
    return [
        {
            name: "is_finished",
            label: "وضعیت اتمام",
            type: "switch",
            defaultValue: false,
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs({ users }: KernelData): ConfigItem[] {
    return [
        {
            name: "is_finished",
            label: "وضعیت اتمام",
            type: "switch",
            defaultValue: false,
            required: true,
        },
        {
            name: "create.date",
            label: "تاریخ ایجاد",
            type: "string-input",
            defaultValue: "",
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
    ];
}

export const updateDialogDocs: DeepPartial<PlanningSeries> = {
    id: "185",
    create: {
        date: "2025-08-14 10:26",
        user: "",
    },
    is_finished: false,
};

export const tableFilter: TableFilter[] = [
    {
        name: "is_finished",
        label: "وضعیت اتمام",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "create__date",
        label: "تاریخ ایجاد",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "create__user",
        label: "کاربر ایجادکننده",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی کاربر ایجادکننده",
        defaultValue: "",
    },
];