import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  usePostLoadedProductItemMutation,
  usePatchLoadedProductItemMutation,
  useDeleteLoadedProductItemMutation,
  useDeleteBulkLoadedProductItemMutation,
} from "../api/loadedProductItemsApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateLoadedProductItemDto } from "../model/loadedProductItemsTypes";
import { updateDialogDocs } from "../model/loadedProductItemsIndex";

export const useLoadedProductItemsActions = () => {
  const navigate = useNavigate();
  const [postLoadedProductItem] = usePostLoadedProductItemMutation();
  const [patchLoadedProductItem] = usePatchLoadedProductItemMutation();
  const [deleteLoadedProductItem] = useDeleteLoadedProductItemMutation();
  const [deleteBulkLoadedProductItem] =
    useDeleteBulkLoadedProductItemMutation();

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

  const deleteHandler = async (id: string) => {
    try {
      await deleteLoadedProductItem({ id }).unwrap();
      toast.success("Item deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete item.");
    }
  };

  const bulkDeleteHandler = async (ids: string[]) => {
    try {
      await deleteBulkLoadedProductItem({ data: { data: ids } }).unwrap();
      toast.success("Items deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete items.");
    }
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    try {
      await postLoadedProductItem(data as CreateLoadedProductItemDto).unwrap();
      toast.success("Item created successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to create item.");
    }
  };

  const handleUpdateConfirm = async (data: Record<string, any>) => {
    let formattedData = formatData(data);
    formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);
    try {
      await patchLoadedProductItem({
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
