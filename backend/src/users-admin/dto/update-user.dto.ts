import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GENDER } from '../shared/enums/gender.enum';

export class UpdateUserDto {
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  DOB: Date; // dateOfBirth 

  @ApiPropertyOptional({ enum: GENDER })
  @IsOptional()
  @IsIn([GENDER.FEMALE, GENDER.MALE, GENDER.NOT_SPECIFIED])
  gender: GENDER;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phoneNumber: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
