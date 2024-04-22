import { GENDER } from "@/utils/enums/gender.enum";
import { ROLE_USER_UNIVERSITY } from "./enums/role-user-university.enum";

export interface UsersUniversity {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  DOB: Date; // dateOfBirth
  gender: GENDER;
  phoneNumber: string;
  address: string;
  subDistrict: string;
  city: string;
  province: string;
  country: string;
  zipCode: string;
  role: ROLE_USER_UNIVERSITY;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateUserUniversityModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  DOB: string; // dateOfBirth 
  gender: GENDER;
  phoneNumber: string
  address?: string;
  subDistrict: string;
  city: string;
  province: string;
  country: string;
  zipCode: string;
  role: ROLE_USER_UNIVERSITY;
  statusId: number;
}

export interface EditUserUniversityModel {
  firstname: string;
  lastname: string;
  email: string;
  DOB: string; // dateOfBirth 
  gender: GENDER;
  phoneNumber: string
  address?: string;
  subDistrict: string;
  city: string;
  province: string;
  country: string;
  zipCode: string;
  role: ROLE_USER_UNIVERSITY;
  statusId: number;
}