import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostPoultryCuttingImportMutation,
    usePatchPoultryCuttingImportMutation,
    useDeletePoultryCuttingImportMutation,
    useDeleteBulkPoultryCuttingImportMutation,
} from "../api/poultryCuttingImportApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreatePoultryCuttingImportDto } from "../model/poultryCuttingImportType";
import { updateDialogDocs } from "../model/poultryCuttingImportIndex";

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

export const usePoultryCuttingImportActions = () => {
    const navigate = useNavigate();
    const [postPoultryCuttingImport] = usePostPoultryCuttingImportMutation();
    const [patchPoultryCuttingImport] = usePatchPoultryCuttingImportMutation();
    const [deletePoultryCuttingImport] = useDeletePoultryCuttingImportMutation();
    const [deleteBulkPoultryCuttingImport] = useDeleteBulkPoultryCuttingImportMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deletePoultryCuttingImport({ id }).unwrap();
            toast.success("محصول وارداتی با موفقیت حذف شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف محصول وارداتی.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkPoultryCuttingImport({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("محصولات وارداتی با موفقیت حذف شدند!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف گروهی محصولات وارداتی.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreatePoultryCuttingImportDto> = {
            product: {
                product: data.product?.product || 0,
                product_owner: data.product?.product_owner || 0,
            },
            product_information: {
                weight: data.product_information?.weight || 0,
                number: data.product_information?.number || 0,
            },
            dispatch_unit: data.dispatch_unit || "",
            poultry_cutting_production_series: {
                product_owner: data.poultry_cutting_production_series?.product_owner || "",
                create: {
                    date: data.poultry_cutting_production_series?.create?.date || "2025-08-14 10:26",
                    user: data.poultry_cutting_production_series?.create?.user || "",
                },
                start: {
                    date: data.poultry_cutting_production_series?.start?.date || "2025-08-14 10:26",
                    user: data.poultry_cutting_production_series?.start?.user || "",
                },
                finished: {
                    date: data.poultry_cutting_production_series?.finished?.date || "2025-08-14 10:26",
                    user: data.poultry_cutting_production_series?.finished?.user || "",
                },
                status: data.poultry_cutting_production_series?.status || "pending",
            },
        };

        try {
            await postPoultryCuttingImport(formattedData).unwrap();
            toast.success("محصول وارداتی با موفقیت ایجاد شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در ایجاد محصول وارداتی.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchPoultryCuttingImport({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("محصول وارداتی با موفقیت به‌روزرسانی شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در به‌روزرسانی محصول وارداتی.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};