import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { GENDER } from 'src/users-admin/shared/enums/gender.enum';
import { ROLE_USER_UNIVERSITY } from 'src/users-university/shared/enums/role-user-university.enum';

export class UpdateUsersUniversityDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  DOB: Date; // dateOfBirth 

  @ApiPropertyOptional({ enum: GENDER })
  @IsOptional()
  @IsIn([
    GENDER.FEMALE,
    GENDER.MALE,
    GENDER.NOT_SPECIFIED
  ])
  gender: GENDER;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subDistrict: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  province: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zipCode: string;

  @ApiPropertyOptional({ enum: ROLE_USER_UNIVERSITY})
  @IsOptional()
  @IsIn([ROLE_USER_UNIVERSITY.STUDENT, ROLE_USER_UNIVERSITY.TEACHER])
  role: ROLE_USER_UNIVERSITY;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  statusId: number;
}
