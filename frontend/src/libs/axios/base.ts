import axios, { AxiosError } from "axios";
import { CONFIG } from "../../../configs/config";
import { ErrorResponse } from "@/utils/interface/responses/error-response.interface";
import { enqueueSnackbar } from "notistack";

const axiosInstance = axios.create({
  baseURL: CONFIG.backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response.data,
  (error: AxiosError) => {
    console.log(error);
    if (error.code === 'ERR_NETWORK') {
      enqueueSnackbar(
        'Failed to connect to the server Please try again later.',
        { variant: 'error' }
      );
      return Promise.reject(error);
    }
    return Promise.reject<ErrorResponse>(error?.response?.data);
  }
);

export default axiosInstance;