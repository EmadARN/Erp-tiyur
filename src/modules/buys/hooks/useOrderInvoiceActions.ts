import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostOrderInvoiceMutation,
    usePatchOrderInvoiceMutation,
    useDeleteOrderInvoiceMutation,
    useDeleteBulkOrderInvoiceMutation,
} from "../api/orderInvoiceApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateOrderInvoiceDto } from "../model/orderInvoice";
import { updateDialogDocs } from "../model/orderInvoiceIndex.ts";

function formatData(data: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    Object.entries(data).forEach(([key, value]) => {
        if (value === null) return;
        const parts = key.split(".");
        let current = result;
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) current[parts[i]] = {};
            current = current[parts[i]] as Record<string, any>;
        }
        current[parts[parts.length - 1]] = value;
    });
    return result;
}

const mergeDataWithDefault = (data: any, defaultData: any): any => {
    const result = { ...defaultData };
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && key in result) {
            if (typeof data[key] === "object" && data[key] !== null && !Array.isArray(data[key])) {
                result[key] = mergeDataWithDefault(data[key], result[key]);
            } else {
                result[key] = data[key];
            }
        }
    }
    return result;
};

export const useOrderInvoiceActions = () => {
    const navigate = useNavigate();
    const [postOrderInvoice] = usePostOrderInvoiceMutation();
    const [patchOrderInvoice] = usePatchOrderInvoiceMutation();
    const [deleteOrderInvoice] = useDeleteOrderInvoiceMutation();
    const [deleteBulkOrderInvoice] = useDeleteBulkOrderInvoiceMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deleteOrderInvoice({ id }).unwrap();
            toast.success("Data deleted successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to delete data.");
        }
    };

    const bulkDeleteHandler = async (ids: string[]) => {
        try {
            await deleteBulkOrderInvoice({ data: { data: ids } }).unwrap();
            toast.success("Data deleted successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to delete data.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreateOrderInvoiceDto> = {
            purchase_date: data["purchase_date"],
            invoice_number: data["invoice_number"],
            title: data["title"],
            description: data["description"],
            seller: {
                name: data["seller.name"],
                bank_account: data["seller.bank_account"],
            },
        };
        try {
            await postOrderInvoice(formattedData).unwrap();
            toast.success("Data sent successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to send data.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);
        try {
            await patchOrderInvoice({ id: formattedData.id, data: formattedData }).unwrap();
            toast.success("Data updated successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to update data.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};
