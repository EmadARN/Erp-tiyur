import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    usePostProductionImportByCarMutation,
    usePatchProductionImportByCarMutation,
    useDeleteProductionImportByCarMutation,
    useDeleteBulkProductionImportByCarMutation,
} from "../api/productionImportByCarApi";
import { handleApiError } from "@/modules/shared/lib/handleApiError";
import type { CreateProductionImportByCarDto } from "../model/productionImportByCarType";
import { updateDialogDocs } from "../model/productionImportByCarIndex";

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

export const useProductionImportByCarActions = () => {
    const navigate = useNavigate();
    const [postProductionImportByCar] = usePostProductionImportByCarMutation();
    const [patchProductionImportByCar] = usePatchProductionImportByCarMutation();
    const [deleteProductionImportByCar] = useDeleteProductionImportByCarMutation();
    const [deleteBulkProductionImportByCar] = useDeleteBulkProductionImportByCarMutation();

    const deleteHandler = async (id: string) => {
        try {
            await deleteProductionImportByCar({ id }).unwrap();
            toast.success("واردات محصول با خودرو با موفقیت حذف شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف واردات محصول با خودرو.");
        }
    };

    const bulkDeleteHandler = async (arrayIndex: string[]) => {
        try {
            await deleteBulkProductionImportByCar({
                data: { data: arrayIndex },
            }).unwrap();
            toast.success("واردات محصولات با خودرو با موفقیت حذف شدند!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در حذف گروهی واردات محصولات با خودرو.");
        }
    };

    const handleCreateConfirm = async (data: Record<string, any>) => {
        const formattedData: Partial<CreateProductionImportByCarDto> = {
            agriculture: {
                city: data.agriculture?.city || "",
                agriculture: data.agriculture?.agriculture || "",
            },
            car: {
                driver: data.car?.driver || "",
                car: data.car?.car || "",
            },
            product: {
                product: data.product?.product || 0,
                product_owner: data.product?.product_owner || 0,
            },
            slaughter_type: data.slaughter_type || "Slaughterhouse delivery",
            order_type: data.order_type || "company",
            production_series: {
                product_owner: data.production_series?.product_owner || 0,
                create: {
                    date: data.production_series?.create?.date || "2025-08-14 10:26",
                    user: data.production_series?.create?.user || "",
                },
                start: {
                    date: data.production_series?.start?.date || "2025-08-14 10:26",
                    user: data.production_series?.start?.user || "",
                },
                finish: {
                    date: data.production_series?.finish?.date || "2025-08-14 10:26",
                    user: data.production_series?.finish?.user || "",
                },
                status: data.production_series?.status || "pending",
            },
        };

        try {
            await postProductionImportByCar(formattedData).unwrap();
            toast.success("واردات محصول با خودرو با موفقیت ایجاد شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در ایجاد واردات محصول با خودرو.");
        }
    };

    const handleUpdateConfirm = async (data: Record<string, any>) => {
        let formattedData = formatData(data);
        formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

        try {
            await patchProductionImportByCar({
                id: formattedData.id,
                data: formattedData,
            }).unwrap();
            toast.success("واردات محصول با خودرو با موفقیت به‌روزرسانی شد!");
        } catch (err) {
            handleApiError(err, navigate, "خطا در به‌روزرسانی واردات محصول با خودرو.");
        }
    };

    return {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    };
};