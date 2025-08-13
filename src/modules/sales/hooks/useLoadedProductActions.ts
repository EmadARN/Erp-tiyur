import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  usePostLoadedProductMutation,
  usePatchLoadedProductMutation,
  useDeleteLoadedProductMutation,
  useDeleteBulkLoadedProductMutation,
} from "../api/loadedProductApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateLoadedProductDto } from "../model/loadedProductTypes";
import { updateDialogDocs } from "../model/loadedProductIndex";

export const useLoadedProductActions = () => {
  const navigate = useNavigate();
  const [postLoadedProduct] = usePostLoadedProductMutation();
  const [patchLoadedProduct] = usePatchLoadedProductMutation();
  const [deleteLoadedProduct] = useDeleteLoadedProductMutation();
  const [deleteBulkLoadedProduct] = useDeleteBulkLoadedProductMutation();

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
      await deleteLoadedProduct({ id }).unwrap();
      toast.success("Product deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete product.");
    }
  };

  const bulkDeleteHandler = async (ids: string[]) => {
    try {
      await deleteBulkLoadedProduct({ data: { data: ids } }).unwrap();
      toast.success("Products deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete products.");
    }
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    try {
      await postLoadedProduct(data as CreateLoadedProductDto).unwrap();
      toast.success("Product created successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to create product.");
    }
  };

  const handleUpdateConfirm = async (data: Record<string, any>) => {
    let formattedData = formatData(data);
    formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);
    try {
      await patchLoadedProduct({
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
