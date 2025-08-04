
import { axiosBaseQuery } from '@/modules/shared/lib/rtkQueryBase'
import { createApi } from '@reduxjs/toolkit/query/react'

export const salesApi = createApi({
    reducerPath: 'salesApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getSales: builder.query<any, void>({
            query: () => ({
                url: '/sales/',
                method: 'get',
            }),
        }),
    }),
})

export const { useGetSalesQuery } = salesApi
