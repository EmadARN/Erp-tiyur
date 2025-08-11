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
    getBuyProductDetails: builder.query<any, void>({
      query: () => ({
        url: "/buy-product/c/test_str/",
        method: "get",
      }),
    }),
    postBuyProduct: builder.mutation<any, { id: number; name: string }>({
      query: (body) => ({
        url: "/buy-product/create/",
        method: "post",
        data: body,
      }),
    }),
    patchBuyProduct: builder.mutation<any, { id: number; name: string }>({
      query: ({ id, ...patchData }) => ({
        url: `/buy-product/c/${id}/`,
        method: "patch",
        data: patchData,
      }),
    }),
    deleteBuyProduct: builder.mutation<any, number>({
      query: (id) => ({
        url: `/buy-product/c/${id}/`,
        method: "delete",
      }),
    }),
  }),
});

export const {
  useGetBuyProductQuery,
  useGetBuyProductDetailsQuery,
  usePostBuyProductMutation,
  usePatchBuyProductMutation,
  useDeleteBuyProductMutation,
} = buyProductApi;
