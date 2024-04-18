import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { GENDER } from '../shared/enums/gender.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;  

  @IsNotEmpty()
  @IsString()
  password: string;  

  @IsNotEmpty()
  @IsDateString()
  DOB: Date; // dateOfBirth 

  @IsOptional()
  @IsIn([GENDER.FEMALE, GENDER.MALE, GENDER.NOT_SPECIFIED])
  gender: GENDER;  

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

}
