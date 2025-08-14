import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostTruckLoadingMutation,
    usePatchTruckLoadingMutation,
    useDeleteTruckLoadingMutation,
    useDeleteBulkTruckLoadingMutation,
} from "../api/truckLoadingApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateTruckLoadingDto } from "../model/truckLoadingType.ts";
import { updateDialogDocs } from "../model/truckLoadingIndex.ts";

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

export const useTruckLoadingActions = () => {
    const navigate = useNavigate();
    const [postTruckLoading] = usePostTruckLoadingMutation();
    const [patchTruckLoading] = usePatchTruckLoadingMutation();
    const [deleteTruckLoading] = useDeleteTruckLoadingMutation();
    const [deleteBulkTruckLoading] = useDeleteBulkTruckLoadingMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deleteTruckLoading({ id }).unwrap();
            toast.success("Truck loading deleted successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to delete truck loading.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkTruckLoading({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("Truck loadings deleted successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to delete truck loadings.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreateTruckLoadingDto> = {
            car: {
                driver: data["car.driver"],
                car: data["car.car"],
            },
        };

        try {
            await postTruckLoading(formattedData).unwrap();
            toast.success("Truck loading created successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to create truck loading.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchTruckLoading({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("Truck loading updated successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to update truck loading.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};