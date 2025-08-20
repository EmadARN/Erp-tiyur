import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { productCategory, CreateproductCategoryDto } from "../model/productCategory";

export const productCategoryApi = createApi({
  reducerPath: "productCategoryApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["productCategory"],
  endpoints: (builder) => ({
    getproductCategorys: builder.query({
      query: (filters = {}) => ({
        url: "/admin/product/product-category/",
        method: "get",
        params: filters,
      }),
      providesTags: ["productCategory"],
    }),
    getproductCategorysDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/product/product-category/${id}/`,
        method: "get",
      }),
    }),
    postproductCategorys: builder.mutation<productCategory, Partial<CreateproductCategoryDto>>({
      query: (body) => ({
        url: "/admin/product/product-category/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["productCategory"],
    }),
    patchproductCategorys: builder.mutation<productCategory, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/product/product-category/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["productCategory"],
    }),

    deleteproductCategorys: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/product/product-category/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["productCategory"],
    }),
  }),
});

export const {
  useGetproductCategorysQuery,
  useGetproductCategorysDetailsQuery,
  usePostproductCategorysMutation,
  usePatchproductCategorysMutation,
  useDeleteproductCategorysMutation,
} = productCategoryApi;
