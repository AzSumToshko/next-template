import { AxiosRequestConfig } from 'axios';
import BaseService from './BaseService';

/**
 * Interface for car request payload
 */
export interface CarRequestDTO {
  model: string;
  manufacturer: string;
}

/**
 * Interface for car response data
 */
export interface CarResponseDTO {
  id: string; // UUID
  model: string;
  manufacturer: string;
}

/**
 * Interface for email contact request
 */
export interface EmailDTO {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Interface for pagination parameters
 */
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

/**
 * Interface for paginated response
 */
export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

/**
 * Service class for handling car-related API operations
 * Implements endpoints defined in the Spring Car Controller
 */
export default class CarsService extends BaseService {
  /**
   * Constructor for CarsService
   */
  constructor() {
    // Set the base URL segment for car endpoints
    super('/cars');
  }

  /**
   * Get all cars with pagination
   * @param params - Pagination parameters
   * @returns Promise with paginated car data
   */
  async getAllCars(params?: PaginationParams): Promise<PageResponse<CarResponseDTO>> {
    const config: AxiosRequestConfig = {
      params: {
        page: params?.page || 0,
        size: params?.size || 10,
        sort: params?.sort,
      },
    };

    return this.get<PageResponse<CarResponseDTO>>('', config);
  }

  /**
   * Get a car by its UUID
   * @param id - Car UUID
   * @returns Promise with car data
   */
  async getCarById(id: string): Promise<CarResponseDTO> {
    return this.get<CarResponseDTO>(`/${id}`);
  }

  /**
   * Create a new car
   * @param carData - Car data to create
   * @returns Promise with created car data
   */
  async createCar(carData: CarRequestDTO): Promise<CarResponseDTO> {
    return this.post<CarResponseDTO, CarRequestDTO>('', carData);
  }

  /**
   * Update an existing car
   * @param id - Car UUID
   * @param carData - Updated car data
   * @returns Promise with updated car data
   */
  async updateCar(id: string, carData: CarRequestDTO): Promise<CarResponseDTO> {
    return this.put<CarResponseDTO, CarRequestDTO>(`/${id}`, carData);
  }

  /**
   * Delete a car
   * @param id - Car UUID
   * @returns Promise with void result
   */
  async deleteCar(id: string): Promise<void> {
    return this.delete(`/${id}`);
  }

  /**
   * Generate an invoice PDF
   * @returns Promise with PDF data as ArrayBuffer
   */
  async generateInvoicePdf(): Promise<ArrayBuffer> {
    const config: AxiosRequestConfig = {
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/pdf',
      },
    };

    return this.get<ArrayBuffer>('/invoice-pdf', config);
  }

  /**
   * Contact support via email
   * @param emailData - Email data to send
   * @returns Promise with void result
   */
  async contactSupport(emailData: EmailDTO, lang?: string): Promise<void> {
    const config: AxiosRequestConfig = {
      params: {
        lang: lang || 'en',
      },
    };

    return this.post<void, EmailDTO>('/contact', emailData, config);
  }
}
