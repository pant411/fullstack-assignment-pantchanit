import { GENDER } from "../enums/gender.enum";

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: 'Admin';
}

export interface ProfileModel {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  DOB: string; // dateOfBirth 
  gender: GENDER;
  phoneNumber: string;
}