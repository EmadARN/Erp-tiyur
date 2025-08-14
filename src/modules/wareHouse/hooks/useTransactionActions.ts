import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  usePostTransactionMutation,
  usePatchTransactionMutation,
  useDeleteTransactionMutation,
  useDeleteBulkTransactionMutation,
} from "../api/transactionApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateTransactionDto } from "../model/transactionTypes";
import { updateDialogDocs } from "../model/transactionIndex";

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

export const useTransactionActions = () => {
  const navigate = useNavigate();
  const [postTransaction] = usePostTransactionMutation();
  const [patchTransaction] = usePatchTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [deleteBulkTransaction] = useDeleteBulkTransactionMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteTransaction({ id }).unwrap();
      toast.success("Transaction deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete transaction.");
    }
  };

  const bulkDeleteHandler = async (arrayIndex: string[]) => {
    try {
      await deleteBulkTransaction({
        data: { data: arrayIndex },
      }).unwrap();
      toast.success("Transactions deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete transactions.");
    }
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    const formattedData: Partial<CreateTransactionDto> = {
      quantity: {
        weight: data["quantity.weight"],
        number: data["quantity.number"],
        is_weight_base: data["quantity.is_weight_base"],
      },
      is_import: data["is_import"],
      inventory: {
        product: {
          product: data["inventory.product.product"],
          product_owner: data["inventory.product.product_owner"],
        },
        shelf_life: {
          production_date: data["inventory.shelf_life.production_date"],
          expire_date: data["inventory.shelf_life.expire_date"],
          is_perishable: data["inventory.shelf_life.is_perishable"],
        },
        quantity: {
          weight: data["inventory.quantity.weight"],
          number: data["inventory.quantity.number"],
          is_weight_base: data["inventory.quantity.is_weight_base"],
        },
        warehouse: {
          name: data["inventory.warehouse.name"],
          is_active: data["inventory.warehouse.is_active"],
          description: data["inventory.warehouse.description"],
          is_production_warehouse: data["inventory.warehouse.is_production_warehouse"],
          create_date: {
            date: data["inventory.warehouse.create_date.date"],
            user: data["inventory.warehouse.create_date.user"],
          },
        },
      },
      storage_location: data["storage_location"],
      description: data["description"],
    };

    try {
      await postTransaction(formattedData).unwrap();
      toast.success("Transaction created successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to create transaction.");
    }
  };

  const handleUpdateConfirm = async (data: Record<string, any>) => {
    let formattedData = formatData(data);
    formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

    try {
      await patchTransaction({
        id: formattedData.id,
        data: formattedData,
      }).unwrap();
      toast.success("Transaction updated successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to update transaction.");
    }
  };

  return {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  };
};