import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersUniversityStatusDto } from './create-users-university-status.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUsersUniversityStatusDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;
}
