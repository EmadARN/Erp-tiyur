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
import { updateDialogDocs } from "../model/loadedProductItemsIndex.ts";

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

export const useLoadedProductItemsActions = () => {
  const navigate = useNavigate();
  const [postLoadedProductItem] = usePostLoadedProductItemMutation();
  const [patchLoadedProductItem] = usePatchLoadedProductItemMutation();
  const [deleteLoadedProductItem] = useDeleteLoadedProductItemMutation();
  const [deleteBulkLoadedProductItem] = useDeleteBulkLoadedProductItemMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteLoadedProductItem({ id }).unwrap();
      toast.success("Loaded product item deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete loaded product item.");
    }
  };

  const bulkDeleteHandler = async (arrayIndex: string[]) => {
    try {
      await deleteBulkLoadedProductItem({
        data: { data: arrayIndex },
      }).unwrap();
      toast.success("Loaded product items deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete loaded product items.");
    }
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    const formattedData: Partial<CreateLoadedProductItemDto> = {
      weight: data.weight,
      number: data.number,
      loaded_product: {
        product: {
          product: data["loaded_product.product.product"],
          product_owner: data["loaded_product.product.product_owner"],
        },
        created: {
          date: data["loaded_product.created.date"],
          user: data["loaded_product.created.user"],
        },
        price: data["loaded_product.price"],
        car: {
          car: {
            driver: data["loaded_product.car.car.driver"],
            car: data["loaded_product.car.car.car"],
          },
          create_at: {
            date: data["loaded_product.car.create_at.date"],
            user: data["loaded_product.car.create_at.user"],
          },
          level: data["loaded_product.car.level"],
          first_weight: {
            weight: data["loaded_product.car.first_weight.weight"],
            date: {
              date: data["loaded_product.car.first_weight.date.date"],
              user: data["loaded_product.car.first_weight.date.user"],
            },
          },
          last_weight: {
            weight: data["loaded_product.car.last_weight.weight"],
            date: {
              date: data["loaded_product.car.last_weight.date.date"],
              user: data["loaded_product.car.last_weight.date.user"],
            },
          },
          buyer: data["loaded_product.car.buyer"],
          entrance_date: {
            date: data["loaded_product.car.entrance_date.date"],
            user: data["loaded_product.car.entrance_date.user"],
          },
          exit_date: {
            date: data["loaded_product.car.exit_date.date"],
            user: data["loaded_product.car.exit_date.user"],
          },
          is_cancelled: {
            status: data["loaded_product.car.is_cancelled.status"],
            user_date: {
              date: data["loaded_product.car.is_cancelled.user_date.date"],
              user: data["loaded_product.car.is_cancelled.user_date.user"],
            },
          },
        },
        is_weight_base: data["loaded_product.is_weight_base"],
      },
    };

    try {
      await postLoadedProductItem(formattedData).unwrap();
      toast.success("Loaded product item created successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to create loaded product item.");
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
      toast.success("Loaded product item updated successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to update loaded product item.");
    }
  };

  return {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  };
};