import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersUniversityStatusService } from './users-university-status.service';
import { CreateUsersUniversityStatusDto } from './dto/create-users-university-status.dto';
import { UpdateUsersUniversityStatusDto } from './dto/update-users-university-status.dto';

@Controller('users-university-status')
export class UsersUniversityStatusController {
  constructor(private readonly usersUniversityStatusService: UsersUniversityStatusService) {}

  @Post()
  create(@Body() createUsersUniversityStatusDto: CreateUsersUniversityStatusDto) {
    return this.usersUniversityStatusService.create(createUsersUniversityStatusDto);
  }

  @Get()
  findAll() {
    return this.usersUniversityStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersUniversityStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersUniversityStatusDto: UpdateUsersUniversityStatusDto) {
    return this.usersUniversityStatusService.update(+id, updateUsersUniversityStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersUniversityStatusService.remove(+id);
  }
}
