import axiosInstance from "./base";

export const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data)