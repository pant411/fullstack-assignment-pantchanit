import axiosInstance from '@/libs/axios/base';
import { CreateUserUniversityModel, EditUserUniversityModel } from '@/utils/interface/user-university/user-university.interface';

export const createUser = async (payload: CreateUserUniversityModel) => {
  try {
    await axiosInstance.post('admin/users-university', payload);
  } catch (error) {
    throw error;
  }
};

export const editUser = async (id: number, payload: EditUserUniversityModel) => {
  try {
    await axiosInstance.patch(`admin/users-university/${id}`, payload);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await axiosInstance.delete(`admin/users-university/${id}`);
  } catch (error) {
    throw error;
  }
};
