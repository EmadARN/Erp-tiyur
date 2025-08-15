import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostProductionExportMutation,
    usePatchProductionExportMutation,
    useDeleteProductionExportMutation,
    useDeleteBulkProductionExportMutation,
} from "../api/productionExportApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateProductionExportDto } from "../model/productionExportType";
import { updateDialogDocs } from "../model/productionExportIndex";

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

export const useProductionExportActions = () => {
    const navigate = useNavigate();
    const [postProductionExport] = usePostProductionExportMutation();
    const [patchProductionExport] = usePatchProductionExportMutation();
    const [deleteProductionExport] = useDeleteProductionExportMutation();
    const [deleteBulkProductionExport] = useDeleteBulkProductionExportMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deleteProductionExport({ id }).unwrap();
            toast.success("محصول صادراتی با موفقیت حذف شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف محصول صادراتی.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkProductionExport({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("محصولات صادراتی با موفقیت حذف شدند!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف گروهی محصولات صادراتی.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreateProductionExportDto> = {
            product: data.product || "",
            receiver_delivery_unit: data.receiver_delivery_unit || "",
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
            await postProductionExport(formattedData).unwrap();
            toast.success("محصول صادراتی با موفقیت ایجاد شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در ایجاد محصول صادراتی.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchProductionExport({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("محصول صادراتی با موفقیت به‌روزرسانی شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در به‌روزرسانی محصول صادراتی.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};