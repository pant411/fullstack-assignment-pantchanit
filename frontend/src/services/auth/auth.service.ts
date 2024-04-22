import axiosInstance from '@/libs/axios/base';
import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'tokenAdmin';

export const register = async (payload: any) => {
  try {
    await axiosInstance.post('auth/admin/register', payload);
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('auth/admin/login', {
      email,
      password,
    });
    const { accessToken } = response.data;
    Cookies.set(TOKEN_COOKIE_NAME, accessToken, { expires: 10/24 });
    return accessToken;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  Cookies.remove(TOKEN_COOKIE_NAME);
  delete axiosInstance.defaults.headers.common.Authorization;
};

export const isAuthenticated = () => {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if(token) axiosInstance.defaults.headers.common.Authorization = `bearer ${token}`;
  return !!token;
};

export const getProfile = async () => {
  try {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    if (!token) throw new Error('Token not found');
    const response = await axiosInstance.get(`admin/users/me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
