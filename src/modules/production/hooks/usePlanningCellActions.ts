import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostPlanningCellMutation,
    usePatchPlanningCellMutation,
    useDeletePlanningCellMutation,
    useDeleteBulkPlanningCellMutation,
} from "../api/planningCellApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreatePlanningCellDto } from "../model/planningCellType";
import { updateDialogDocs } from "../model/plannigCellIndex";

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

export const usePlanningCellActions = () => {
    const navigate = useNavigate();
    const [postPlanningCell] = usePostPlanningCellMutation();
    const [patchPlanningCell] = usePatchPlanningCellMutation();
    const [deletePlanningCell] = useDeletePlanningCellMutation();
    const [deleteBulkPlanningCell] = useDeleteBulkPlanningCellMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deletePlanningCell({ id }).unwrap();
            toast.success("سلول برنامه‌ریزی با موفقیت حذف شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف سلول برنامه‌ریزی.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkPlanningCell({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("سلول‌های برنامه‌ریزی با موفقیت حذف شدند!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف گروهی سلول‌های برنامه‌ریزی.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreatePlanningCellDto> = {
            priority: data.priority,
            import_type: data.import_type,
            import_id: data.import_id,
        };

        try {
            await postPlanningCell(formattedData).unwrap();
            toast.success("سلول برنامه‌ریزی با موفقیت ایجاد شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در ایجاد سلول برنامه‌ریزی.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchPlanningCell({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("سلول برنامه‌ریزی با موفقیت به‌روزرسانی شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در به‌روزرسانی سلول برنامه‌ریزی.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};