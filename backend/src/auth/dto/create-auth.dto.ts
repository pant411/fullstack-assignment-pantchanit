import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { GENDER } from 'src/users-admin/shared/enums/gender.enum';
import { ROLE } from 'src/users-admin/shared/enums/role.enum';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsIn([GENDER.FEMALE, GENDER.MALE, GENDER.NOT_SPECIFIED])
  gender: GENDER;

  @IsOptional()
  @IsIn([ROLE.ADMIN, ROLE.CUSTOMER])
  role: ROLE;

  @IsNotEmpty()
  @IsDateString()
  DOB: Date; // dateOfBirth
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
