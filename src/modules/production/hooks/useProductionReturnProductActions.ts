import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostProductionReturnProductMutation,
    usePatchProductionReturnProductMutation,
    useDeleteProductionReturnProductMutation,
    useDeleteBulkProductionReturnProductMutation,
} from "../api/productionReturnProductApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateProductionReturnProductDto } from "../model/productionReturnProductType";
import { updateDialogDocs } from "../model/productionReturnProductIndex";

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

export const useProductionReturnProductActions = () => {
    const navigate = useNavigate();
    const [postProductionReturnProduct] = usePostProductionReturnProductMutation();
    const [patchProductionReturnProduct] = usePatchProductionReturnProductMutation();
    const [deleteProductionReturnProduct] = useDeleteProductionReturnProductMutation();
    const [deleteBulkProductionReturnProduct] = useDeleteBulkProductionReturnProductMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deleteProductionReturnProduct({ id }).unwrap();
            toast.success("بازگشت محصول با موفقیت حذف شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف بازگشت محصول.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkProductionReturnProduct({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("بازگشت محصولات با موفقیت حذف شدند!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف گروهی بازگشت محصولات.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreateProductionReturnProductDto> = {
            receiver_delivery_unit: data.receiver_delivery_unit || "",
            product: {
                product: data.product?.product || 0,
                product_owner: data.product?.product_owner || 0,
            },
            product_information: {
                weight: data.product_information?.weight || 0,
                number: data.product_information?.number || 0,
            },
            return_type: data.return_type || "return from production",
        };

        try {
            await postProductionReturnProduct(formattedData).unwrap();
            toast.success("بازگشت محصول با موفقیت ایجاد شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در ایجاد بازگشت محصول.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchProductionReturnProduct({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("بازگشت محصول با موفقیت به‌روزرسانی شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در به‌روزرسانی بازگشت محصول.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};