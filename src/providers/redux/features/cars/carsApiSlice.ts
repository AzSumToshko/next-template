import { apiSlice } from '../apiSlice/apiSlice';
import { CarRequestDTO, CarResponseDTO, EmailDTO, PageResponse } from '@/service/CarsService';

/**
 * Extended API slice for car-related endpoints
 */
export const carsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all cars with pagination
    getCars: builder.query<
      PageResponse<CarResponseDTO>,
      { page?: number; size?: number; sort?: string }
    >({
      query: (params) => ({
        url: '/cars',
        params: {
          page: params.page || 0,
          size: params.size || 10,
          sort: params.sort,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Cars' as const, id })),
              { type: 'Cars', id: 'LIST' },
            ]
          : [{ type: 'Cars', id: 'LIST' }],
    }),

    // Get car by ID
    getCarById: builder.query<CarResponseDTO, string>({
      query: (id) => `/cars/${id}`,
      providesTags: (_, __, id) => [{ type: 'Cars', id }],
    }),

    // Create a new car
    createCar: builder.mutation<CarResponseDTO, CarRequestDTO>({
      query: (car) => ({
        url: '/cars',
        method: 'POST',
        body: car,
      }),
      invalidatesTags: [{ type: 'Cars', id: 'LIST' }],
    }),

    // Update a car
    updateCar: builder.mutation<CarResponseDTO, { id: string; car: CarRequestDTO }>({
      query: ({ id, car }) => ({
        url: `/cars/${id}`,
        method: 'PUT',
        body: car,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Cars', id },
        { type: 'Cars', id: 'LIST' },
      ],
    }),

    // Delete a car
    deleteCar: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Cars', id },
        { type: 'Cars', id: 'LIST' },
      ],
    }),

    // Generate invoice PDF
    generateInvoicePdf: builder.query<Blob, void>({
      query: () => ({
        url: '/cars/invoice-pdf',
        responseHandler: async (response) => response.blob(),
      }),
    }),

    // Contact support
    contactSupport: builder.mutation<void, { emailData: EmailDTO; lang?: string }>({
      query: ({ emailData, lang }) => ({
        url: '/cars/contact',
        method: 'POST',
        params: { lang: lang || 'en' },
        body: emailData,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetCarsQuery,
  useLazyGetCarsQuery,
  useGetCarByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useLazyGenerateInvoicePdfQuery,
  useContactSupportMutation,
} = carsApiSlice;
