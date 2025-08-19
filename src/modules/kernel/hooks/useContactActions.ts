import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetContactsQuery,
  useGetContactsDetailsQuery,
  usePostContactsMutation,
  usePatchContactsMutation,
  useDeleteContactsMutation,
} from "../api/ContactApi.ts";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateContactDto } from "../model/contact.ts";


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

export const useContactActions = () => {
  const navigate = useNavigate();
  const [postContact] = usePostContactsMutation();
  const [patchContact] = usePatchContactsMutation();
  const [deleteContact] = useDeleteContactsMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteContact({ id }).unwrap();
      toast.success("Data deleted successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to delete data.");
    }
  };

  const bulkDeleteHandler = async (ids: string[]) => {
    ids.map(async (id) => {
      try {
        await deleteContact({ id }).unwrap();
        toast.success("Data deleted successfully!");
      } catch (err) {
        handleApiError(err, navigate, "Failed to delete data.");
      }
    });
  };

  const handleCreateConfirm = async (data: Record<string, any>) => {
    console.log("dadadadada", data);
    const formattedData: Partial<CreateContactDto> = {
      name: data["name"],
      unit_ids: data["unit_ids"],
    };
    try {
      await postContact(formattedData).unwrap();
      toast.success("Data sent successfully!");
    } catch (err) {
      handleApiError(err, navigate, "Failed to send data.");
    }
  };

  const handleUpdateConfirm = async (data: Record<string, any>) => {
    let formattedData = formatData(data);
    const Itemid = formattedData.id;

    // formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

    try {
      await patchContact({
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
