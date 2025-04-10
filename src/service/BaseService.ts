import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './instance/axios';

/**
 * Base service class that provides common HTTP methods
 * to be extended by specific API services
 */
export default class BaseService {
  protected baseUrl: string;

  /**
   * Constructor for BaseService
   * @param baseUrl - The base URL for all endpoints in this service
   */
  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  /**
   * Formats the URL by combining baseUrl and endpoint
   * @param endpoint - The API endpoint
   * @returns Formatted URL string
   */
  private formatUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  /**
   * Performs a GET request
   * @param endpoint - API endpoint
   * @param config - Optional Axios request configuration
   * @returns Promise with the response data
   */
  protected async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.get(this.formatUrl(endpoint), config);
    return response.data;
  }

  /**
   * Performs a POST request
   * @param endpoint - API endpoint
   * @param data - Request payload
   * @param config - Optional Axios request configuration
   * @returns Promise with the response data
   */
  protected async post<T = any, D = any>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.post(
      this.formatUrl(endpoint),
      data,
      config
    );
    return response.data;
  }

  /**
   * Performs a PUT request
   * @param endpoint - API endpoint
   * @param data - Request payload
   * @param config - Optional Axios request configuration
   * @returns Promise with the response data
   */
  protected async put<T = any, D = any>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.put(
      this.formatUrl(endpoint),
      data,
      config
    );
    return response.data;
  }

  /**
   * Performs a PATCH request
   * @param endpoint - API endpoint
   * @param data - Request payload
   * @param config - Optional Axios request configuration
   * @returns Promise with the response data
   */
  protected async patch<T = any, D = any>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.patch(
      this.formatUrl(endpoint),
      data,
      config
    );
    return response.data;
  }

  /**
   * Performs a DELETE request
   * @param endpoint - API endpoint
   * @param config - Optional Axios request configuration
   * @returns Promise with the response data
   */
  protected async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.delete(this.formatUrl(endpoint), config);
    return response.data;
  }
}
