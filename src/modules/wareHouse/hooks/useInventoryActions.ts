import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  usePostInventoryMutation,
  usePatchInventoryMutation,
  useDeleteInventoryMutation,
  useDeleteBulkInventoryMutation,
} from "../api/inventoryApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateInventoryDto } from "../model/inventoryTypes";
import { updateDialogDocs } from "../model/inventoryIndex";

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

export const useInventoryActions = () => {
  const navigate = useNavigate();
  const [postInventory] = usePostInventoryMutation();
  const [patchInventory] = usePatchInventoryMutation();
  const [deleteInventory] = useDeleteInventoryMutation();
  const [deleteBulkInventory] = useDeleteBulkInventoryMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteInventory({ id }).unwrap();
      toast.success("Data deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete data.");
    }
  };

  const bulkDeleteHandler = async (arrayIndex: string[]) => {
    try {
      await deleteBulkInventory({
        data: { data: arrayIndex },
      }).unwrap();
      toast.success("Data deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete data.");
    }
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    const formattedData: Partial<CreateInventoryDto> = {
      product: {
        product: data["product.product"],
        product_owner: data["product.product_owner"],
      },
      shelf_life: {
        production_date: data["shelf_life.production_date"],
        expire_date: data["shelf_life.expire_date"],
        is_perishable: data["shelf_life.is_perishable"],
      },
      warehouse: {
        name: data["warehouse.name"],
        is_active: data["warehouse.is_active"],
        description: data["warehouse.description"],
        is_production_warehouse: data["warehouse.is_production_warehouse"],
        create_date: {
          date: data["warehouse.create_date.date"],
          user: data["warehouse.create_date.user"],
        },
      },
    };

    try {
      await postInventory(formattedData).unwrap();
      toast.success("Data sent successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to send data.");
    }
  };

  const handleUpdateConfirm = async (data: Record<string, any>) => {
    let formattedData = formatData(data);
    formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

    try {
      await patchInventory({
        id: formattedData.id,
        data: formattedData,
      }).unwrap();
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