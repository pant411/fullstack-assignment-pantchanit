import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GENDER } from 'src/users-admin/shared/enums/gender.enum';
import { ROLE_USER_UNIVERSITY } from 'src/users-university/shared/enums/role-user-university.enum';

export class CreateUsersUniversityDto {
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subDistrict: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @ApiProperty({ enum: ROLE_USER_UNIVERSITY })
  @IsNotEmpty()
  @IsIn([ROLE_USER_UNIVERSITY.STUDENT, ROLE_USER_UNIVERSITY.TEACHER])
  role: ROLE_USER_UNIVERSITY;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  statusId: number;
}
