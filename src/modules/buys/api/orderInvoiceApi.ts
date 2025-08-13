import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { OrderInvoice, CreateOrderInvoiceDto, OrderInvoicesResponse } from "../model/orderInvoice";

export const orderInvoiceApi = createApi({
    reducerPath: "orderInvoiceApi",
    baseQuery: axiosBaseQuery(http.buyApi),
    tagTypes: ["OrderInvoice"],
    endpoints: (builder) => ({
        getOrderInvoices: builder.query<OrderInvoicesResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/order-invoice/",
                method: "get",
                params: filters,
            }),
            providesTags: ["OrderInvoice"],
        }),
        getOrderInvoiceDetails: builder.query<OrderInvoice, { id: string }>({
            query: ({ id }) => ({
                url: `/order-invoice/c/${id}/`,
                method: "get",
            }),
        }),
        postOrderInvoice: builder.mutation<OrderInvoice, Partial<CreateOrderInvoiceDto>>({
            query: (body) => ({
                url: "/order-invoice/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["OrderInvoice"],
        }),
        patchOrderInvoice: builder.mutation<OrderInvoice, { id: string; data: Partial<OrderInvoice> }>({
            query: ({ id, data }) => ({
                url: `/order-invoice/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["OrderInvoice"],
        }),
        deleteBulkOrderInvoice: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/order-invoice/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["OrderInvoice"],
        }),
        deleteOrderInvoice: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/order-invoice/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["OrderInvoice"],
        }),
    }),
});

export const {
    useGetOrderInvoicesQuery,
    useGetOrderInvoiceDetailsQuery,
    usePostOrderInvoiceMutation,
    usePatchOrderInvoiceMutation,
    useDeleteBulkOrderInvoiceMutation,
    useDeleteOrderInvoiceMutation,
} = orderInvoiceApi;
