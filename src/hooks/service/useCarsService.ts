import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CarsService, { CarRequestDTO, EmailDTO, PaginationParams } from '@/service/CarsService';
import { downloadFile, openPdfInNewTab } from '@/utils/fileUtils';

/**
 * Custom hook that provides access to cars API using React Query
 */
export const useCarsService = () => {
  const queryClient = useQueryClient();
  const carsService = new CarsService();

  // Key factory for consistent query keys
  const queryKeys = {
    all: ['cars'] as const,
    lists: () => [...queryKeys.all, 'list'] as const,
    list: (params: PaginationParams) => [...queryKeys.lists(), params] as const,
    details: () => [...queryKeys.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.details(), id] as const,
  };

  // Get all cars (paginated)
  const useGetAllCars = (params?: PaginationParams) => {
    return useQuery({
      queryKey: queryKeys.list(params || {}),
      queryFn: () => carsService.getAllCars(params),
    });
  };

  // Get car by ID
  const useGetCarById = (id: string) => {
    return useQuery({
      queryKey: queryKeys.detail(id),
      queryFn: () => carsService.getCarById(id),
      enabled: !!id, // Only run the query if we have an ID
    });
  };

  // Create a new car
  const useCreateCar = () => {
    return useMutation({
      mutationFn: (newCar: CarRequestDTO) => carsService.createCar(newCar),
      onSuccess: () => {
        // Invalidate the cars list query to refetch
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      },
    });
  };

  // Update a car
  const useUpdateCar = () => {
    return useMutation({
      mutationFn: ({ id, carData }: { id: string; carData: CarRequestDTO }) =>
        carsService.updateCar(id, carData),
      onSuccess: (_, { id }) => {
        // Invalidate the specific car and the cars list
        queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      },
    });
  };

  // Delete a car
  const useDeleteCar = () => {
    return useMutation({
      mutationFn: (id: string) => carsService.deleteCar(id),
      onSuccess: () => {
        // Invalidate the cars list query to refetch
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      },
    });
  };

  // Generate invoice PDF
  const useGenerateInvoicePdf = () => {
    return useMutation({
      mutationFn: () => carsService.generateInvoicePdf(),
      onSuccess: (data) => {
        // Download the generated PDF
        downloadFile(data as ArrayBuffer, 'invoice.pdf');
      },
    });
  };

  // Open invoice PDF in new tab
  const useOpenInvoicePdf = () => {
    return useMutation({
      mutationFn: () => carsService.generateInvoicePdf(),
      onSuccess: (data) => {
        // Open the generated PDF in a new tab
        openPdfInNewTab(data as ArrayBuffer);
      },
    });
  };

  // Contact support
  const useContactSupport = () => {
    return useMutation({
      mutationFn: ({ emailData, lang }: { emailData: EmailDTO; lang?: string }) =>
        carsService.contactSupport(emailData, lang),
      onSuccess: () => {
        // Success handling can go here if needed
      },
      onError: (error) => {
        // Error handling can go here if needed
        console.error('Contact support failed:', error);
      },
    });
  };

  return {
    useGetAllCars,
    useGetCarById,
    useCreateCar,
    useUpdateCar,
    useDeleteCar,
    useGenerateInvoicePdf,
    useOpenInvoicePdf,
    useContactSupport,
  };
};
