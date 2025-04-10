import { apiSlice } from '../apiSlice/apiSlice';
export const ecommerceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEcommerces: builder.query({
      query: (query) => {
        return {
          url: `/ecommerces?${query}`,
        };
      },
    }),
    getEcommerceById: builder.query({
      query: (id) => `/ecommerces/${id}`,
    }),
    addEcommerce: builder.mutation({
      query: (info) => {
        return {
          url: '/ecommerces',
          method: 'POST',
          body: info,
        };
      },
    }),
    editEcommerce: builder.mutation({
      query: (info) => {
        return {
          url: `/ecommerces/${info._id}`,
          method: 'PATCH',
          body: info,
        };
      },
    }),
    deleteEcommerce: builder.mutation({
      query: (id) => {
        return {
          url: `/ecommerces/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});
export const {
  useGetEcommercesQuery,
  useAddEcommerceMutation,
  useDeleteEcommerceMutation,
  useEditEcommerceMutation,
  useGetEcommerceByIdQuery,
} = ecommerceApi;
