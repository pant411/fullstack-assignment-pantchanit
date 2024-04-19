import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class AxiosBase  {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.axiosInstance.interceptors.response.use(
      this.responseSuccessInterceptor,
      this.responseErrorInterceptor,
    )
  }

  private responseSuccessInterceptor(response: AxiosResponse): AxiosResponse {
    return response
  }

  private responseErrorInterceptor(err: any): Promise<any> {
    return Promise.reject(err);
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config)
    return response.data
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config)
    return response.data
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config)
    return response.data
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config)
    return response.data
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config)
    return response.data
  }
}

export default AxiosBase;