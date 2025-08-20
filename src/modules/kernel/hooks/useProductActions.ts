import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  usePostproductsMutation,
  usePatchproductsMutation,
  useDeleteproductsMutation,
} from "../api/productApi.ts";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateproductDto } from "../model/product.ts";

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

export const useproductActions = () => {
  const navigate = useNavigate();
  const [postproduct] = usePostproductsMutation();
  const [patchproduct] = usePatchproductsMutation();
  const [deleteproduct] = useDeleteproductsMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteproduct({ id }).unwrap();
      toast.success("Data deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete data.");
    }
  };

  const bulkDeleteHandler = async (ids: string[]) => {
    ids.map(async (id) => {
      try {
        await deleteproduct({ id }).unwrap();
        toast.success("Data deleted successfully!");
      } catch (err) {
        handleApiError(err, navigate, "Failed to delete data.");
      }
    });
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    const formattedData: Partial<CreateproductDto> = {
      name: data.name,
      code: data.code,
      category: data.category,
      units: typeof data.units === "string" ? [data.units] : data.units,

    };
    try {
      await postproduct(formattedData).unwrap();
      toast.success("Data sent successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to send data.");
    }
  };

  const handleUpdateConfirm = async (data: Record<string, any>) => {
    let formattedData = formatData(data);
    const Itemid = formattedData.id;

    // formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);
    formattedData.units = typeof data.units === "string" ? [data.units] : data.units
    formattedData.category = typeof formattedData.category === 'object' && formattedData.category !== null ? formattedData.category.id : formattedData.category;

    try {
      await patchproduct({
        id: Itemid,
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
