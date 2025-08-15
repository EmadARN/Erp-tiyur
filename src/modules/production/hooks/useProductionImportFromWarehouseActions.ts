import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostProductionImportFromWarehouseMutation,
    usePatchProductionImportFromWarehouseMutation,
    useDeleteProductionImportFromWarehouseMutation,
    useDeleteBulkProductionImportFromWarehouseMutation,
} from "../api/productionImportFromWarehouseApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateProductionImportFromWarehouseDto } from "../model/productionImportFromWarehouseType";
import { updateDialogDocs } from "../model/productionImportFromWarehouseIndex";

// Helper function to format nested data structures.
function formatData(data: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
        if (value === null) {
            return;
        }

        const parts = key.split(".");
        let current = result;

        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!current[part]) {
                current[part] = {};
            }
            current = current[part] as Record<string, any>;
        }

        current[parts[parts.length - 1]] = value;
    });

    return result;
}

// Helper function to merge data with a default structure.
const mergeDataWithDefault = (data: any, defaultData: any): any => {
    const result = { ...defaultData };

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && key in result) {
            if (
                typeof data[key] === "object" &&
                data[key] !== null &&
                !Array.isArray(data[key])
            ) {
                result[key] = mergeDataWithDefault(data[key], result[key]);
            } else {
                result[key] = data[key];
            }
        }
    }

    return result;
};

export const useProductionImportFromWarehouseActions = () => {
    const navigate = useNavigate();
    const [postProductionImportFromWarehouse] = usePostProductionImportFromWarehouseMutation();
    const [patchProductionImportFromWarehouse] = usePatchProductionImportFromWarehouseMutation();
    const [deleteProductionImportFromWarehouse] = useDeleteProductionImportFromWarehouseMutation();
    const [deleteBulkProductionImportFromWarehouse] = useDeleteBulkProductionImportFromWarehouseMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deleteProductionImportFromWarehouse({ id }).unwrap();
            toast.success("واردات محصول از انبار با موفقیت حذف شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف واردات محصول از انبار.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkProductionImportFromWarehouse({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("واردات محصولات از انبار با موفقیت حذف شدند!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف گروهی واردات محصولات از انبار.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreateProductionImportFromWarehouseDto> = {
            product_description: {
                warehouse_unit: data.product_description?.warehouse_unit || "",
                product: {
                    product: data.product_description?.product?.product || 0,
                    product_owner: data.product_description?.product?.product_owner || 0,
                },
            },
            product_information: {
                weight: data.product_information?.weight || 0,
                number: data.product_information?.number || 0,
            },
            production_series: {
                product_owner: data.production_series?.product_owner || 0,
                create: {
                    date: data.production_series?.create?.date || "2025-08-14 10:26",
                    user: data.production_series?.create?.user || "",
                },
                start: {
                    date: data.production_series?.start?.date || "2025-08-14 10:26",
                    user: data.production_series?.start?.user || "",
                },
                finish: {
                    date: data.production_series?.finish?.date || "2025-08-14 10:26",
                    user: data.production_series?.finish?.user || "",
                },
                status: data.production_series?.status || "pending",
            },
        };

        try {
            await postProductionImportFromWarehouse(formattedData).unwrap();
            toast.success("واردات محصول از انبار با موفقیت ایجاد شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در ایجاد واردات محصول از انبار.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchProductionImportFromWarehouse({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("واردات محصول از انبار با موفقیت به‌روزرسانی شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در به‌روزرسانی واردات محصول از انبار.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};