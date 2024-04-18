import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { SortOrder } from '../enums/sort-order.enum';
import { Type } from 'class-transformer';
import { ROLE_USER_UNIVERSITY } from '../../enums/role-user-university.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationUserUniversityFilterDto {
  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  @IsNotEmpty()
  @IsNumber({}, { message: ' "page" atrribute should be a number' })
  public page: number;

  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  @IsNotEmpty()
  @IsNumber({}, { message: ' "pageSize" attribute should be a number ' })
  public pageSize: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstname: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastname: string

  @ApiPropertyOptional({
    enum: ROLE_USER_UNIVERSITY
  })
  @IsIn([
    ROLE_USER_UNIVERSITY.STUDENT,
    ROLE_USER_UNIVERSITY.TEACHER
  ])
  @IsOptional()
  role: ROLE_USER_UNIVERSITY;

  @ApiPropertyOptional()
  @IsOptional()
  public orderBy?: string;

  @ApiPropertyOptional({
    enum: SortOrder
  })
  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.ASC;
}
