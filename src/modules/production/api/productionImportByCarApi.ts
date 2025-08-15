import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { ProductionImportByCar, CreateProductionImportByCarDto, ProductionImportsByCarResponse } from "../model/productionImportByCarType";

export const productionImportByCarApi = createApi({
    reducerPath: "productionImportsByCarApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["ProductionImportByCar"],
    endpoints: (builder) => ({
        getProductionImportsByCar: builder.query<ProductionImportsByCarResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/production-import-product-by-car/",
                method: "get",
                params: filters,
            }),
            providesTags: ["ProductionImportByCar"],
        }),
        getProductionImportByCarDetails: builder.query<ProductionImportByCar, { id: string }>({
            query: ({ id }) => ({
                url: `/production-import-product-by-car/c/${id}/`,
                method: "get",
            }),
        }),
        postProductionImportByCar: builder.mutation<ProductionImportByCar, Partial<CreateProductionImportByCarDto>>({
            query: (body) => ({
                url: "/production-import-product-by-car/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["ProductionImportByCar"],
        }),
        patchProductionImportByCar: builder.mutation<ProductionImportByCar, { id: string; data: Partial<ProductionImportByCar> }>({
            query: ({ id, data }) => ({
                url: `/production-import-product-by-car/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["ProductionImportByCar"],
        }),
        deleteBulkProductionImportByCar: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/production-import-product-by-car/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["ProductionImportByCar"],
        }),
        deleteProductionImportByCar: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/production-import-product-by-car/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["ProductionImportByCar"],
        }),
    }),
});

export const {
    useGetProductionImportsByCarQuery,
    useGetProductionImportByCarDetailsQuery,
    usePostProductionImportByCarMutation,
    usePatchProductionImportByCarMutation,
    useDeleteBulkProductionImportByCarMutation,
    useDeleteProductionImportByCarMutation,
} = productionImportByCarApi;