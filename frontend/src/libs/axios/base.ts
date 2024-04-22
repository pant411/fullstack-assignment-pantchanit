import axios from "axios";
import { CONFIG } from "../../../configs/config";

const axiosInstance = axios.create({
  baseURL: CONFIG.backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;