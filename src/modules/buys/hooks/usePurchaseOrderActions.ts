import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  usePostPurchaseOrderMutation,
  usePatchPurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useDeleteBulkPurchaseOrderMutation,
} from "../api/orderPurchaseOrderApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreatePurchaseOrderDto } from "../model/purchaseOrderTypes";
import { updateDialogDocs } from "../model/purchaseOrderIndex";

export const usePurchaseOrderActions = () => {
  const navigate = useNavigate();
  const [postPurchaseOrder] = usePostPurchaseOrderMutation();
  const [patchPurchaseOrder] = usePatchPurchaseOrderMutation();
  const [deletePurchaseOrder] = useDeletePurchaseOrderMutation();
  const [deleteBulkPurchaseOrder] = useDeleteBulkPurchaseOrderMutation();

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
      await deletePurchaseOrder({ id }).unwrap();
      toast.success("Purchase order deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete purchase order.");
    }
  };

  const bulkDeleteHandler = async (ids: string[]) => {
    try {
      await deleteBulkPurchaseOrder({ data: { data: ids } }).unwrap();
      toast.success("Purchase orders deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete purchase orders.");
    }
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    const formattedData: Partial<CreatePurchaseOrderDto> = {
      product: {
        product_name: data["product.product_name"],
        quantity: data["product.quantity"],
        unit: data["product.unit"],
      },
      required_deadline: data.required_deadline,
    };
    try {
      await postPurchaseOrder(formattedData).unwrap();
      toast.success("Purchase order created successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to create purchase order.");
    }
  };

  const handleUpdateConfirm = async (data: Record<string, any>) => {
    let formattedData = formatData(data);
    formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);
    try {
      await patchPurchaseOrder({
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
