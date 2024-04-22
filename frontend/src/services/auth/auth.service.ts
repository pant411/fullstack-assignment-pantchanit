import { TOKEN_COOKIE_NAME } from '../../../configs/config';
import axiosInstance from '@/libs/axios/base';
import { ProfileModel } from '@/utils/interface/user.interface';
import Cookies from 'js-cookie';

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
    const response = await axiosInstance.get(`admin/users/me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editProfile = async (id: number, payload: ProfileModel) => {
  try {
    const response = await axiosInstance.patch(`admin/users/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  try {
    const response = await axiosInstance.patch('admin/users/reset-password', {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

