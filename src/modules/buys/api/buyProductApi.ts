import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";

export const buyProductApi = createApi({
  reducerPath: "buysApi",
  baseQuery: axiosBaseQuery(http.buyApi),
  tagTypes: ["BuyProduct"], // تعریف تگ برای مدیریت کش
  endpoints: (builder) => ({
    getBuyProduct: builder.query<any, any>({
      query: (filters = {}) => ({
        url: "/buy-product/",
        method: "get",
        params: filters, // پشتیبانی از پارامترهای فیلتر و جستجو
      }),
      providesTags: ["BuyProduct"], // این query تگ BuyProduct را فراهم می‌کند
    }),
    getBuyProductDetails: builder.mutation<any, { id: number | string }>({
      query: ({ id }) => ({
        url: `/buy-product/c/${id}/`,
        method: "get",
      }),
    }),
    postBuyProduct: builder.mutation<any, any>({
      query: (body) => ({
        url: "/buy-product/create/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["BuyProduct"], // بعد از POST، تگ BuyProduct را invalidate می‌کند
    }),
    patchBuyProduct: builder.mutation<any, { id: number | string; data: any }>({
      query: ({ id, data }) => ({
        url: `/buy-product/c/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["BuyProduct"], // بعد از PATCH، تگ BuyProduct را invalidate می‌کند
    }),
    deleteBulkBuyProduct: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: '/buy-product/',
        method: "delete",
        data,
      }),
      invalidatesTags: ["BuyProduct"], // بعد از PATCH، تگ BuyProduct را invalidate می‌کند
    }),
    deleteBuyProduct: builder.mutation<any, { id: number | string }>({
      query: ({ id }) => ({
        url: `/buy-product/c/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["BuyProduct"], // بعد از DELETE، تگ BuyProduct را invalidate می‌کند
    }),
  }),
});

export const {
  useGetBuyProductQuery,
  useGetBuyProductDetailsMutation,
  usePostBuyProductMutation,
  usePatchBuyProductMutation,
  useDeleteBulkBuyProductMutation,
  useDeleteBuyProductMutation,
} = buyProductApi;