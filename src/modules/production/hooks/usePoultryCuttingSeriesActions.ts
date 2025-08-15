import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostPoultryCuttingSeriesMutation,
    usePatchPoultryCuttingSeriesMutation,
    useDeletePoultryCuttingSeriesMutation,
    useDeleteBulkPoultryCuttingSeriesMutation,
} from "../api/poultryCuttingSeriesApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreatePoultryCuttingSeriesDto } from "../model/poultryCuttingSeriesType";
import { updateDialogDocs } from "../model/poultryCuttingSeriesIndex";

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

export const usePoultryCuttingSeriesActions = () => {
    const navigate = useNavigate();
    const [postPoultryCuttingSeries] = usePostPoultryCuttingSeriesMutation();
    const [patchPoultryCuttingSeries] = usePatchPoultryCuttingSeriesMutation();
    const [deletePoultryCuttingSeries] = useDeletePoultryCuttingSeriesMutation();
    const [deleteBulkPoultryCuttingSeries] = useDeleteBulkPoultryCuttingSeriesMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deletePoultryCuttingSeries({ id }).unwrap();
            toast.success("سری تولید با موفقیت حذف شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف سری تولید.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkPoultryCuttingSeries({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("سری‌های تولید با موفقیت حذف شدند!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف گروهی سری‌های تولید.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreatePoultryCuttingSeriesDto> = {
            product_owner: data.product_owner || "",
        };

        try {
            await postPoultryCuttingSeries(formattedData).unwrap();
            toast.success("سری تولید با موفقیت ایجاد شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در ایجاد سری تولید.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchPoultryCuttingSeries({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("سری تولید با موفقیت به‌روزرسانی شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در به‌روزرسانی سری تولید.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};