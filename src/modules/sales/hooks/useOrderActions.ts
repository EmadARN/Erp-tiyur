import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostOrderMutation,
    usePatchOrderMutation,
    useDeleteOrderMutation,
    useDeleteBulkOrderMutation,
} from "../api/orderApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateOrderDto } from "../model/orderType.ts";
import { updateDialogDocs } from "../model/orderIndex.ts";

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

export const useOrderActions = () => {
    const navigate = useNavigate();
    const [postOrder] = usePostOrderMutation();
    const [patchOrder] = usePatchOrderMutation();
    const [deleteOrder] = useDeleteOrderMutation();
    const [deleteBulkOrder] = useDeleteBulkOrderMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deleteOrder({ id }).unwrap();
            toast.success("Order deleted successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to delete order.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkOrder({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("Orders deleted successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to delete orders.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreateOrderDto> = {
            customer: data.customer,
        };

        try {
            await postOrder(formattedData).unwrap();
            toast.success("Order created successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to create order.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchOrder({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("Order updated successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to update order.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};