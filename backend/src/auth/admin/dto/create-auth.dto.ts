import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { GENDER } from 'src/users-admin/shared/enums/gender.enum';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  DOB: Date; // dateOfBirth 

  @ApiPropertyOptional({ enum: GENDER })
  @IsOptional()
  @IsIn([GENDER.FEMALE, GENDER.MALE, GENDER.NOT_SPECIFIED])
  gender: GENDER;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
