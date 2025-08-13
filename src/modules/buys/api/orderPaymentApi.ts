import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { OrderPayment, CreateOrderPaymentDto, OrderPaymentsResponse } from "../model/orderPayment";

export const orderPaymentApi = createApi({
    reducerPath: "orderPaymentApi",
    baseQuery: axiosBaseQuery(http.buyApi),
    tagTypes: ["OrderPayment"],
    endpoints: (builder) => ({
        getOrderPayments: builder.query<OrderPaymentsResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/order-payment/",
                method: "get",
                params: filters,
            }),
            providesTags: ["OrderPayment"],
        }),
        getOrderPaymentDetails: builder.query<OrderPayment, { id: string }>({
            query: ({ id }) => ({
                url: `/order-payment/c/${id}/`,
                method: "get",
            }),
        }),
        postOrderPayment: builder.mutation<OrderPayment, Partial<CreateOrderPaymentDto>>({
            query: (body) => ({
                url: "/order-payment/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["OrderPayment"],
        }),
        patchOrderPayment: builder.mutation<OrderPayment, { id: string; data: Partial<OrderPayment> }>({
            query: ({ id, data }) => ({
                url: `/order-payment/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["OrderPayment"],
        }),
        deleteBulkOrderPayment: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/order-payment/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["OrderPayment"],
        }),
        deleteOrderPayment: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/order-payment/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["OrderPayment"],
        }),
    }),
});

export const {
    useGetOrderPaymentsQuery,
    useGetOrderPaymentDetailsQuery,
    usePostOrderPaymentMutation,
    usePatchOrderPaymentMutation,
    useDeleteBulkOrderPaymentMutation,
    useDeleteOrderPaymentMutation,
} = orderPaymentApi;
