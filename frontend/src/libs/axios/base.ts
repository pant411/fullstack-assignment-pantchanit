import axios, { AxiosError } from "axios";
import { CONFIG } from "../../../configs/config";
import { ErrorResponse } from "@/utils/interface/responses/error-response.interface";

const axiosInstance = axios.create({
  baseURL: CONFIG.backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject<ErrorResponse>(error.response.data);
  }
);

export default axiosInstance;