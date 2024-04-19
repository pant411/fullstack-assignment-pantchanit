import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
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
  @MinLength(
    8, 
    { 
      message: 'Password is too short - should be 8 chars minimum.' 
    }
  )
  @Matches(
    /[a-zA-Z0-9]/, 
    { 
      message: 'Password can only contain Latin letters and number.' 
    }
  )
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
