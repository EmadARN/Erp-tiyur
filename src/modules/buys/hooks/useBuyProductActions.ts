import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  usePostBuyProductMutation,
  usePatchBuyProductMutation,
  useDeleteBuyProductMutation,
  useDeleteBulkBuyProductMutation,
} from "../api/buyProductApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateBuyProductDto } from "../model/buysProduct.ts";
import { updateDialogDocs } from "../model/buyProductIndex.ts";

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

export const useBuyProductActions = () => {
  const navigate = useNavigate();
  const [postBuyProduct] = usePostBuyProductMutation();
  const [patchBuyProduct] = usePatchBuyProductMutation();
  const [deleteBuyProduct] = useDeleteBuyProductMutation();
  const [deleteBulkBuyProduct] = useDeleteBulkBuyProductMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteBuyProduct({ id }).unwrap();
      toast.success("Data deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete data.");
    }
  };

  const bulkDeleteHandler = async (arrayIndex: string[]) => {
    try {
      await deleteBulkBuyProduct({
        data: { data: arrayIndex },
      }).unwrap();
      toast.success("Data deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete data.");
    }
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    const formattedData: Partial<CreateBuyProductDto> = {
      car: {
        car: data["car.car"],
        driver: data["car.driver"],
      },
      order_information: {
        agriculture: data["order_information.agriculture"],
        product_owner: data["order_information.product_owner"],
        slaughter_type: data["order_information.slaughter_type"],
        order_type: data["order_information.order_type"],
        product: data["order_information.product"],
      },
      required_weight: data.required_weight,
      required_number: data.required_number,
    };

    try {
      await postBuyProduct(formattedData).unwrap();
      toast.success("Data sent successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to send data.");
    }
  };

  const handleUpdateConfirm = async (data: Record<string, any>) => {
    let formattedData = formatData(data);
    formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

    try {
      await patchBuyProduct({
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
