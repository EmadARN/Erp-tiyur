import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  usePostcarsMutation,
  usePatchcarsMutation,
  useDeletecarsMutation,
} from "../api/carApi.ts";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreatecarDto } from "../model/car.ts";

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

export const usecarActions = () => {
  const navigate = useNavigate();
  const [postcar] = usePostcarsMutation();
  const [patchcar] = usePatchcarsMutation();
  const [deletecar] = useDeletecarsMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deletecar({ id }).unwrap();
      toast.success("Data deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete data.");
    }
  };

  const bulkDeleteHandler = async (ids: string[]) => {
    ids.map(async (id) => {
      try {
        await deletecar({ id }).unwrap();
        toast.success("Data deleted successfully!");
      } catch (err) {
        handleApiError(err, navigate, "Failed to delete data.");
      }
    });
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    const formattedData: Partial<CreatecarDto> = {
      prefix_number: data.prefix_number,
      alphabet: data.alphabet,
      postfix_number: data.postfix_number,
      city_code: data.city_code,
      has_refrigerator: data.has_refrigerator,
      product_category: data.product_category,
      slug: data.slug,
      repetitive: data.repetitive,
      driver: data.driver,
    };
    try {
      await postcar(formattedData).unwrap();
      toast.success("Data sent successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to send data.");
    }
  };

  const handleUpdateConfirm = async (data: Record<string, any>) => {
    let formattedData = formatData(data);
    const Itemid = formattedData.id;

    // formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);
    formattedData.city_code = typeof formattedData.city_code === 'object' && formattedData.city_code !== null ? formattedData.city_code.id : formattedData.city_code;
    formattedData.product_category = typeof formattedData.product_category === 'object' && formattedData.product_category !== null ? formattedData.product_category.id : formattedData.product_category;
    formattedData.driver = typeof formattedData.driver === 'object' && formattedData.driver !== null ? formattedData.driver.id : formattedData.driver;

    try {
      await patchcar({
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
