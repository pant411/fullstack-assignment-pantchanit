import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersUniversityService } from './users-university.service';
import { CreateUsersUniversityDto } from './dto/create-users-university.dto';
import { UpdateUsersUniversityDto } from './dto/update-users-university.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users-university')
@ApiTags('User University')
export class UsersUniversityController {
  constructor(private readonly usersUniversityService: UsersUniversityService) {}

  @Post()
  create(@Body() createUsersUniversityDto: CreateUsersUniversityDto) {
    return this.usersUniversityService.create(createUsersUniversityDto);
  }

  @Get()
  findAll() {
    return this.usersUniversityService.findAll();
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
