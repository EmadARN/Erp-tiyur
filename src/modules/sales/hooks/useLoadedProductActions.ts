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
import { updateDialogDocs } from "../model/loadedProductIndex.ts";

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

export const useLoadedProductActions = () => {
  const navigate = useNavigate();
  const [postLoadedProduct] = usePostLoadedProductMutation();
  const [patchLoadedProduct] = usePatchLoadedProductMutation();
  const [deleteLoadedProduct] = useDeleteLoadedProductMutation();
  const [deleteBulkLoadedProduct] = useDeleteBulkLoadedProductMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteLoadedProduct({ id }).unwrap();
      toast.success("Loaded product deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete loaded product.");
    }
  };

  const bulkDeleteHandler = async (arrayIndex: string[]) => {
    try {
      await deleteBulkLoadedProduct({
        data: { data: arrayIndex },
      }).unwrap();
      toast.success("Loaded products deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete loaded products.");
    }
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    const formattedData: Partial<CreateLoadedProductDto> = {
      product: {
        product: data["product.product"],
        product_owner: data["product.product_owner"],
      },
      price: data.price,
      car: {
        car: {
          driver: data["car.car.driver"],
          car: data["car.car.car"],
        },
        create_at: {
          date: data["car.create_at.date"],
          user: data["car.create_at.user"],
        },
        level: data["car.level"],
        first_weight: {
          weight: data["car.first_weight.weight"],
          date: {
            date: data["car.first_weight.date.date"],
            user: data["car.first_weight.date.user"],
          },
        },
        last_weight: {
          weight: data["car.last_weight.weight"],
          date: {
            date: data["car.last_weight.date.date"],
            user: data["car.last_weight.date.user"],
          },
        },
        buyer: data["car.buyer"],
        entrance_date: {
          date: data["car.entrance_date.date"],
          user: data["car.entrance_date.user"],
        },
        exit_date: {
          date: data["car.exit_date.date"],
          user: data["car.exit_date.user"],
        },
        is_cancelled: {
          status: data["car.is_cancelled.status"],
          user_date: {
            date: data["car.is_cancelled.user_date.date"],
            user: data["car.is_cancelled.user_date.user"],
          },
        },
      },
      is_weight_base: data.is_weight_base,
    };

    try {
      await postLoadedProduct(formattedData).unwrap();
      toast.success("Loaded product created successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to create loaded product.");
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
      toast.success("Loaded product updated successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to update loaded product.");
    }
  };

  return {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  };
};