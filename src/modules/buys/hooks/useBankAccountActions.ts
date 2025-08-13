import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostBankAccountMutation,
    usePatchBankAccountMutation,
    useDeleteBankAccountMutation,
    useDeleteBulkBankAccountMutation,
} from "../api/bankAccountApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateBankAccountDto } from "../model/bankAccount";
import { updateDialogDocs } from "../model/index.ts";

// Helper function to format dot.notation keys into nested objects
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

export const useBankAccountActions = () => {
    const navigate = useNavigate();
    const [postBankAccount] = usePostBankAccountMutation();
    const [patchBankAccount] = usePatchBankAccountMutation();
    const [deleteBankAccount] = useDeleteBankAccountMutation();
    const [deleteBulkBankAccount] = useDeleteBulkBankAccountMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deleteBankAccount({ id }).unwrap();
            toast.success("Data deleted successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to delete data.");
        }
    };

    const bulkDeleteHandler = async (ids: string[]) => {
        try {
            await deleteBulkBankAccount({ data: { data: ids } }).unwrap();
            toast.success("Data deleted successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to delete data.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreateBankAccountDto> = {
            owner_name: data["owner_name"],
            account_number: data["account_number"],
        };
        try {
            await postBankAccount(formattedData).unwrap();
            toast.success("Data sent successfully!");
        } catch (err) {
            handleApiError(err, navigate, "Failed to send data.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);
        try {
            await patchBankAccount({ id: formattedData.id, data: formattedData }).unwrap();
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
