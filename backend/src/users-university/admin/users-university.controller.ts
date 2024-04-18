import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { UsersUniversityService } from './users-university.service';
import { CreateUsersUniversityDto } from './dto/create-users-university.dto';
import { UpdateUsersUniversityDto } from './dto/update-users-university.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseModel } from 'src/shared/responses/resposne.interface';
import { UsersUniversity } from '../shared/entities/users-university.entity';
import { PaginationUserUniversityFilterDto } from '../shared/paginations/dtos/pagination.dto';

@Controller('api/v1/admin/users-university')
@ApiTags('User University')
@ApiBearerAuth()
export class UsersUniversityController {
  constructor(private readonly usersUniversityService: UsersUniversityService) {}

  @Post()
  async create(@Body() createUsersUniversityDto: CreateUsersUniversityDto): 
    Promise<ResponseModel<UsersUniversity>>  {
    const data = await this.usersUniversityService.create(createUsersUniversityDto);
    return {
      data,
      message: 'Create user of university successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  @ApiQuery({ type: PaginationUserUniversityFilterDto})
  findAll(@Query() filter: PaginationUserUniversityFilterDto) {
    return this.usersUniversityService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersUniversityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersUniversityDto: UpdateUsersUniversityDto) {
    return this.usersUniversityService.update(+id, updateUsersUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersUniversityService.remove(+id);
  }
}
