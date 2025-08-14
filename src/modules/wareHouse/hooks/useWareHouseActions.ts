import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  usePostWarehouseMutation,
  usePatchWarehouseMutation,
  useDeleteWarehouseMutation,
  useDeleteBulkWarehouseMutation,
} from "../api/wareHouseApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateWarehouseDto } from "../model/wareHouseType";
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

export const useWarehouseActions = () => {
  const navigate = useNavigate();
  const [postWarehouse] = usePostWarehouseMutation();
  const [patchWarehouse] = usePatchWarehouseMutation();
  const [deleteWarehouse] = useDeleteWarehouseMutation();
  const [deleteBulkWarehouse] = useDeleteBulkWarehouseMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteWarehouse({ id }).unwrap();
      toast.success("Warehouse deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete warehouse.");
    }
  };

  const bulkDeleteHandler = async (arrayIndex: string[]) => {
    try {
      await deleteBulkWarehouse({
        data: { data: arrayIndex },
      }).unwrap();
      toast.success("Warehouses deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete warehouses.");
    }
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    const formattedData: Partial<CreateWarehouseDto> = {
      name: data["name"],
      description: data["description"],
      is_production_warehouse: data["is_production_warehouse"],
    };

    try {
      await postWarehouse(formattedData).unwrap();
      toast.success("Warehouse created successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to create warehouse.");
    }
  };

  const handleUpdateConfirm = async (data: Record<string, any>) => {
    let formattedData = formatData(data);
    formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

    try {
      await patchWarehouse({
        id: formattedData.id,
        data: formattedData,
      }).unwrap();
      toast.success("Warehouse updated successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to update warehouse.");
    }
  };

  return {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  };
};