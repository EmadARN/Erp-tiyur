import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const salesApi = createApi({
    reducerPath: 'salesApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/sales' }),
    endpoints: (builder) => ({
        getSales: builder.query({ query: () => '' }),
    }),
})
