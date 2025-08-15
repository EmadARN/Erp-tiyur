import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostPlanningSeriesMutation,
    usePatchPlanningSeriesMutation,
    useDeletePlanningSeriesMutation,
    useDeleteBulkPlanningSeriesMutation,
} from "../api/plannigSeriesApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreatePlanningSeriesDto } from "../model/planningSeriesType";
import { updateDialogDocs } from "../model/planningSeriesIndex";

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

export const usePlanningSeriesActions = () => {
    const navigate = useNavigate();
    const [postPlanningSeries] = usePostPlanningSeriesMutation();
    const [patchPlanningSeries] = usePatchPlanningSeriesMutation();
    const [deletePlanningSeries] = useDeletePlanningSeriesMutation();
    const [deleteBulkPlanningSeries] = useDeleteBulkPlanningSeriesMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deletePlanningSeries({ id }).unwrap();
            toast.success("سری برنامه‌ریزی با موفقیت حذف شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف سری برنامه‌ریزی.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkPlanningSeries({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("سری‌های برنامه‌ریزی با موفقیت حذف شدند!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف گروهی سری‌های برنامه‌ریزی.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreatePlanningSeriesDto> = {
            is_finished: data.is_finished,
        };

        try {
            await postPlanningSeries(formattedData).unwrap();
            toast.success("سری برنامه‌ریزی با موفقیت ایجاد شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در ایجاد سری برنامه‌ریزی.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchPlanningSeries({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("سری برنامه‌ریزی با موفقیت به‌روزرسانی شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در به‌روزرسانی سری برنامه‌ریزی.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};