import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";

export const buyProductApi = createApi({
  reducerPath: "buysApi",
  baseQuery: axiosBaseQuery(http.buyApi),
  endpoints: (builder) => ({
    getBuyProduct: builder.query<any, void>({
      query: () => ({
        url: "/buy-product/",
        method: "get",
      }),
    }),
    getBuyProductDetails: builder.mutation<any, { id: number | string }>({
      query: ({ id }) => ({
        url: `/buy-product/c/${id}/`,
        method: "get",
      }),
    }),
    postBuyProduct: builder.mutation<any, { data: any }>({
      query: (body) => ({
        url: "/buy-product/create/",
        method: "post",
        data: body,
      }),
    }),
    patchBuyProduct: builder.mutation<any, { id: number | string; data: any }>({
      query: ({ id, ...patchData }) => ({
        url: `/buy-product/c/${id}/`,
        method: "patch",
        data: patchData,
      }),
    }),
    deleteBuyProduct: builder.mutation<any, { id: number | string }>({
      query: (id) => ({
        url: `/buy-product/c/${id}/`,
        method: "delete",
      }),
    }),
  }),
});

export const {
  useGetBuyProductQuery,
  useGetBuyProductDetailsMutation,
  usePostBuyProductMutation,
  usePatchBuyProductMutation,
  useDeleteBuyProductMutation,
} = buyProductApi;
