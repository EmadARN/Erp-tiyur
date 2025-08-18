import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { ProductionImportByCar, KernelData } from "./productionImportByCarType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Level", row_id: "level", type: "number" },
    { columnName: "City", row_id: "agriculture.city.name", type: "string" },
    { columnName: "Agriculture", row_id: "agriculture.agriculture.name", type: "string" },
    { columnName: "Driver", row_id: "car.driver.contact.name", type: "string" },
    { columnName: "Car", row_id: "car.car.car_number", type: "string" },
    { columnName: "Product", row_id: "product.product.name", type: "number" },
    { columnName: "Product Owner", row_id: "product.product_owner.contact.name", type: "number" },
    { columnName: "Slaughter Type", row_id: "slaughter_type", type: "string" },
    { columnName: "Order Type", row_id: "order_type", type: "string" },
    { columnName: "Full Weight", row_id: "second_step.full_weight", type: "number" },
    { columnName: "Cage Number", row_id: "second_step.cage_number", type: "number" },
    { columnName: "Planning Status", row_id: "is_planned.status", type: "boolean" },
    { columnName: "Cancelled Status", row_id: "is_cancelled.status", type: "boolean" },
    { columnName: "Verified Status", row_id: "is_verified.status", type: "boolean" },
    { columnName: "Production Series Status", row_id: "production_series.status", type: "string" },
];

export function getCreateDialogConfigs({ agriculture, drivers, cars, products, owners }: KernelData): ConfigItem[] {
    return [
        { name: "agriculture.city", label: "City", type: "string-input", defaultValue: "", required: false },
        { name: "agriculture.agriculture", label: "Agriculture", type: "select-box", options: agriculture, defaultValue: agriculture?.[0]?.value, required: true },
        { name: "car.driver", label: "Driver", type: "select-box", options: drivers, defaultValue: drivers?.[0]?.value, required: true },
        { name: "car.car", label: "Car", type: "select-box", options: cars, defaultValue: cars?.[0]?.value, required: true },
        { name: "product.product", label: "Product", type: "select-box", options: products, defaultValue: products?.[0]?.value, required: true },
        { name: "product.product_owner", label: "Product Owner", type: "select-box", options: owners, defaultValue: owners?.[0]?.value, required: true },
        { name: "slaughter_type", label: "Slaughter Type", type: "select-box", options: [
                { label: 'Slaughterhouse delivery', value: 'Slaughterhouse delivery' },
                { label: 'Poultry farm door', value: 'Poultry farm door' },
            ], defaultValue: 'Poultry farm door', required: true },
        { name: "order_type", label: "Order Type", type: "select-box", options: [
                { label: 'Company', value: 'company' },
                { label: 'Purchase commission by the company', value: 'Purchase commission by the company' },
                { label: 'Purchase commission by the product owner', value: 'Purchase commission by the product owner' },
            ], defaultValue: 'Poultry farm door', required: true },
        { name: "production_series.product_owner", label: "Production Series Product Owner", type: "select-box", options: owners, defaultValue: owners?.[0]?.value, required: true },
        { name: "production_series.status", label: "Production Series Status", type: "select-box", options: [
                { label: "Pending", value: "pending" },
                { label: "Started", value: "started" },
                { label: "Finished", value: "finished" },
            ], defaultValue: "pending", required: true },
    ];
}

export function getUpdateDialogConfigs({ agriculture, drivers, cars, products, owners }: KernelData): ConfigItem[] {
    return [
        { name: "level", label: "Level", type: "int-input", defaultValue: 1, required: true },
        { name: "agriculture.city", label: "City",type: "string-input", defaultValue: "", required: false },
        { name: "agriculture.agriculture", label: "Agriculture", type: "select-box", options: agriculture, defaultValue: agriculture?.[0]?.value, required: true },
        { name: "car.driver", label: "Driver", type: "select-box", options: drivers, defaultValue: drivers?.[0]?.value, required: true },
        { name: "car.car", label: "Car", type: "select-box", options: cars, defaultValue: cars?.[0]?.value, required: true },
        { name: "product.product", label: "Product", type: "select-box", options: products, defaultValue: products?.[0]?.value, required: true },
        { name: "product.product_owner", label: "Product Owner", type: "select-box", options: owners, defaultValue: owners?.[0]?.value, required: true },
        { name: "slaughter_type", label: "Slaughter Type", type: "select-box", options: [
                { label: 'Slaughterhouse delivery', value: 'Slaughterhouse delivery' },
                { label: 'Poultry farm door', value: 'Poultry farm door' },
            ], defaultValue: 'Poultry farm door', required: true },
        { name: "order_type", label: "Order Type", type: "select-box", options: [
                { label: 'Company', value: 'company' },
                { label: 'Purchase commission by the company', value: 'Purchase commission by the company' },
                { label: 'Purchase commission by the product owner', value: 'Purchase commission by the product owner' },
            ], defaultValue: 'Poultry farm door', required: true },
        { name: "first_step.entrance_to_slaughter.date", label: "Entrance to Slaughterhouse Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: false },
        { name: "first_step.entrance_to_slaughter.user", label: "Entrance User", type: "string-input", defaultValue: "", required: false },
        { name: "second_step.full_weight", label: "Full Weight", type: "int-input", defaultValue: 0, required: false },
        { name: "second_step.source_weight", label: "Source Weight", type: "int-input", defaultValue: 0, required: false },
        { name: "second_step.cage_number", label: "Cage Number", type: "int-input", defaultValue: 1, required: false },
        { name: "second_step.product_number_per_cage", label: "Products per Cage", type: "int-input", defaultValue: 1, required: false },
        { name: "third_step.start_production.date", label: "Production Start Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: false },
        { name: "third_step.start_production.user", label: "Production Start User", type: "string-input", defaultValue: "", required: false },
        { name: "fourth_step.finish_production.date", label: "Production Finish Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: false },
        { name: "fourth_step.finish_production.user", label: "Production Finish User", type: "string-input", defaultValue: "", required: false },
        { name: "fifth_step.empty_weight", label: "Empty Weight", type: "int-input", defaultValue: 0, required: false },
        { name: "fifth_step.transit_losses_wight", label: "Transit Loss Weight", type: "int-input", defaultValue: 0, required: false },
        { name: "fifth_step.transit_losses_number", label: "Transit Loss Number", type: "int-input", defaultValue: 0, required: false },
        { name: "fifth_step.losses_weight", label: "Loss Weight", type: "int-input", defaultValue: 0, required: false },
        { name: "fifth_step.losses_number", label: "Loss Number", type: "int-input", defaultValue: 0, required: false },
        { name: "fifth_step.fuel", label: "Fuel", type: "int-input", defaultValue: 0, required: false },
        { name: "fifth_step.extra_description", label: "Extra Description", type: "string-input", defaultValue: "", required: false },
        { name: "sixth_step.exit_from_slaughter.date", label: "Exit from Slaughterhouse Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: false },
        { name: "sixth_step.exit_from_slaughter.user", label: "Exit User", type: "string-input", defaultValue: "", required: false },
        { name: "seventh_step.product_slaughter_number", label: "Slaughter Product Number", type: "int-input", defaultValue: 1, required: false },
        { name: "seventh_step.finish.date", label: "Finish Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: false },
        { name: "seventh_step.finish.user", label: "Finish User", type: "string-input", defaultValue: "", required: false },
        { name: "is_planned.status", label: "Planning Status", type: "switch", defaultValue: false, required: false },
        { name: "is_planned.user_date.date", label: "Planning Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: false },
        { name: "is_planned.user_date.user", label: "Planning User", type: "string-input", defaultValue: "", required: false },
        { name: "is_cancelled.status", label: "Cancelled Status", type: "switch", defaultValue: false, required: false },
        { name: "is_cancelled.user_date.date", label: "Cancellation Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: false },
        { name: "is_cancelled.user_date.user", label: "Cancellation User", type: "string-input", defaultValue: "", required: false },
        { name: "is_verified.status", label: "Verified Status", type: "switch", defaultValue: false, required: false },
        { name: "is_verified.user_date.date", label: "Verification Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: false },
        { name: "is_verified.user_date.user", label: "Verification User", type: "string-input", defaultValue: "", required: false },
        { name: "create.date", label: "Creation Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: false },
        { name: "create.user", label: "Creator User", type: "string-input", defaultValue: "", required: false },
        { name: "production_series.product_owner", label: "Production Series Product Owner", type: "select-box", options: owners, defaultValue: owners?.[0]?.value, required: true },
        { name: "production_series.create.date", label: "Production Series Creation Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: true },
        { name: "production_series.create.user", label: "Production Series Creator User", type: "string-input", defaultValue: "", required: false },
        { name: "production_series.start.date", label: "Production Series Start Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: true },
        { name: "production_series.start.user", label: "Production Series Start User", type: "string-input", defaultValue: "", required: false },
        { name: "production_series.finish.date", label: "Production Series Finish Date", type: "string-input", defaultValue: "2025-08-14 10:26", required: true },
        { name: "production_series.finish.user", label: "Production Series Finish User", type: "string-input", defaultValue: "", required: false },
        { name: "production_series.status", label: "Production Series Status", type: "select-box", options: [
                { label: "Pending", value: "pending" },
                { label: "Started", value: "started" },
                { label: "Finished", value: "finished" },
            ], defaultValue: "pending", required: true },
    ];
}

export const updateDialogDocs: DeepPartial<ProductionImportByCar> = {
    id: "296",
    level: 1,
    agriculture: { city: "", agriculture: "" },
    car: { driver: "", car: "" },
    product: { product: 0, product_owner: 0 },
    slaughter_type: "Slaughterhouse delivery",
    order_type: "company",
    first_step: { entrance_to_slaughter: { date: "2025-08-14 10:26", user: "" } },
    second_step: { full_weight: 0, source_weight: 0, cage_number: 1, product_number_per_cage: 1 },
    third_step: { start_production: { date: "2025-08-14 10:26", user: "" } },
    fourth_step: { finish_production: { date: "2025-08-14 10:26", user: "" } },
    fifth_step: { empty_weight: 0, transit_losses_wight: 0, transit_losses_number: 0, losses_weight: 0, losses_number: 0, fuel: 0, extra_description: "" },
    sixth_step: { exit_from_slaughter: { date: "2025-08-14 10:26", user: "" } },
    seventh_step: { product_slaughter_number: 1, finish: { date: "2025-08-14 10:26", user: "" } },
    is_planned: { status: false, user_date: { date: "2025-08-14 10:26", user: "" } },
    is_cancelled: { status: false, user_date: { date: "2025-08-14 10:26", user: "" } },
    is_verified: { status: false, user_date: { date: "2025-08-14 10:26", user: "" } },
    create: { date: "2025-08-14 10:26", user: "" },
    production_series: { create: { date: "2025-08-14 10:26", user: "" }, start: { date: "2025-08-14 10:26", user: "" }, finish: { date: "2025-08-14 10:26", user: "" }, product_owner: 0, status: "pending" },
};

export const tableFilter: TableFilter[] = [
    { name: "agriculture__city", label: "City", type: "autocomplete", options: [], placeholder: "Search city", defaultValue: "" },
    { name: "agriculture__agriculture", label: "Agriculture", type: "autocomplete", options: [], placeholder: "Search agriculture", defaultValue: "" },
    { name: "car__driver", label: "Driver", type: "autocomplete", options: [], placeholder: "Search driver", defaultValue: "" },
    { name: "car__car", label: "Car", type: "autocomplete", options: [], placeholder: "Search car", defaultValue: "" },
    { name: "product__product", label: "Product", type: "autocomplete", options: [], placeholder: "Search product", defaultValue: "" },
    { name: "product__product_owner", label: "Product Owner", type: "autocomplete", options: [], placeholder: "Search product owner", defaultValue: "" },
    { name: "slaughter_type", label: "Slaughter Type", type: "select-box", options: [], defaultValue: "Slaughterhouse delivery" },
    { name: "order_type", label: "Order Type", type: "select-box", options: [], defaultValue: "company" },
    { name: "second_step__full_weight", label: "Full Weight", type: "range", min: 0, max: 1000, step: 1, defaultValue: [0, 500] },
    { name: "second_step__cage_number", label: "Cage Number", type: "range", min: 0, max: 100, step: 1, defaultValue: [0, 50] },
    { name: "is_planned__status", label: "Planning Status", type: "boolean", defaultValue: false },
    { name: "is_cancelled__status", label: "Cancelled Status", type: "boolean", defaultValue: false },
    { name: "is_verified__status", label: "Verified Status", type: "boolean", defaultValue: false },
    { name: "production_series__status", label: "Production Series Status", type: "select-box", options: [], defaultValue: "pending" },
];
