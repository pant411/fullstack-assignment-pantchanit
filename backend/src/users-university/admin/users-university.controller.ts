import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersUniversityService } from './users-university.service';
import { CreateUsersUniversityDto } from './dto/create-users-university.dto';
import { UpdateUsersUniversityDto } from './dto/update-users-university.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseModel } from 'src/shared/responses/resposne.interface';
import { UsersUniversity } from '../shared/entities/users-university.entity';
import { PaginationUserUniversityFilterDto } from '../shared/paginations/dtos/pagination.dto';
import { PaginationResponse } from 'src/shared/responses/pagination.response';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/admin/users-university')
@ApiTags('User University')
@ApiBearerAuth()
export class UsersUniversityController {
  constructor(private readonly usersUniversityService: UsersUniversityService) { }

  @Post()
  async create(@Body() createUsersUniversityDto: CreateUsersUniversityDto):
    Promise<ResponseModel<UsersUniversity>> {
    const data = await this.usersUniversityService.create(createUsersUniversityDto);
    return {
      data,
      message: 'Create user of university successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  async findAll(@Query() filter: PaginationUserUniversityFilterDto):
    Promise<ResponseModel<PaginationResponse<UsersUniversity>>> {
    const data = await this.usersUniversityService.findAll(filter);
    return {
      data,
      message: data.items.length > 0 ?
        'Found List user of university successfully' :
        'Not Found List user of university successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseModel<UsersUniversity>> {
    const data = await this.usersUniversityService.findOne(+id);
    return {
      data,
      message: 'Found',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsersUniversityDto: UpdateUsersUniversityDto):
    Promise<ResponseModel<UsersUniversity>> {
    const data = await this.usersUniversityService.update(+id, updateUsersUniversityDto);
    return {
      data,
      message: 'Update user of university successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseModel> {
    await this.usersUniversityService.remove(+id);
    return {
      message: 'Delete user of university successfully',
      statusCode: HttpStatus.OK,
    }
  }
}
