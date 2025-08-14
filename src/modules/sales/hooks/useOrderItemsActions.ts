import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostOrderItemMutation,
    usePatchOrderItemMutation,
    useDeleteOrderItemMutation,
    useDeleteBulkOrderItemMutation,
} from "../api/orderItemsApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateOrderItemDto } from "../model/orderItemsType.ts";
import { updateDialogDocs } from "../model/orderItemsIndex.ts";

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

export const useOrderItemsActions = () => {
    const navigate = useNavigate();
    const [postOrderItem] = usePostOrderItemMutation();
    const [patchOrderItem] = usePatchOrderItemMutation();
    const [deleteOrderItem] = useDeleteOrderItemMutation();
    const [deleteBulkOrderItem] = useDeleteBulkOrderItemMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deleteOrderItem({ id }).unwrap();
            toast.success("Order item deleted successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to delete order item.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkOrderItem({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("Order items deleted successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to delete order items.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreateOrderItemDto> = {
            product: data.product,
            weight: data.weight,
            number: data.number,
            order: {
                customer: data["order.customer"],
                create: {
                    date: data["order.create.date"],
                    user: data["order.create.user"],
                },
                car: {
                    driver: data["order.car.driver"],
                    car: data["order.car.car"],
                },
                attachment_status: {
                    status: data["order.attachment_status.status"],
                    user_date: {
                        date: data["order.attachment_status.user_date.date"],
                        user: data["order.attachment_status.user_date.user"],
                    },
                },
                cancelled: {
                    status: data["order.cancelled.status"],
                    user_date: {
                        date: data["order.cancelled.user_date.date"],
                        user: data["order.cancelled.user_date.user"],
                    },
                },
                verified: {
                    status: data["order.verified.status"],
                    user_date: {
                        date: data["order.verified.user_date.date"],
                        user: data["order.verified.user_date.user"],
                    },
                },
            },
        };

        try {
            await postOrderItem(formattedData).unwrap();
            toast.success("Order item created successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to create order item.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchOrderItem({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("Order item updated successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to update order item.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};