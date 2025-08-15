import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { ProductionReturnProduct, CreateProductionReturnProductDto, ProductionReturnProductsResponse } from "../model/productionReturnProductType";

export const productionReturnProductApi = createApi({
    reducerPath: "productionReturnProductsApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["ProductionReturnProduct"],
    endpoints: (builder) => ({
        getProductionReturnProducts: builder.query<ProductionReturnProductsResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/production-return-product/",
                method: "get",
                params: filters,
            }),
            providesTags: ["ProductionReturnProduct"],
        }),
        getProductionReturnProductDetails: builder.query<ProductionReturnProduct, { id: string }>({
            query: ({ id }) => ({
                url: `/production-return-product/c/${id}/`,
                method: "get",
            }),
        }),
        postProductionReturnProduct: builder.mutation<ProductionReturnProduct, Partial<CreateProductionReturnProductDto>>({
            query: (body) => ({
                url: "/production-return-product/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["ProductionReturnProduct"],
        }),
        patchProductionReturnProduct: builder.mutation<ProductionReturnProduct, { id: string; data: Partial<ProductionReturnProduct> }>({
            query: ({ id, data }) => ({
                url: `/production-return-product/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["ProductionReturnProduct"],
        }),
        deleteBulkProductionReturnProduct: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/production-return-product/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["ProductionReturnProduct"],
        }),
        deleteProductionReturnProduct: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/production-return-product/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["ProductionReturnProduct"],
        }),
    }),
});

export const {
    useGetProductionReturnProductsQuery,
    useGetProductionReturnProductDetailsQuery,
    usePostProductionReturnProductMutation,
    usePatchProductionReturnProductMutation,
    useDeleteBulkProductionReturnProductMutation,
    useDeleteProductionReturnProductMutation,
} = productionReturnProductApi;