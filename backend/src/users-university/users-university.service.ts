import { Injectable } from '@nestjs/common';
import { CreateUsersUniversityDto } from './dto/create-users-university.dto';
import { UpdateUsersUniversityDto } from './dto/update-users-university.dto';

@Injectable()
export class UsersUniversityService {
  create(createUsersUniversityDto: CreateUsersUniversityDto) {
    return 'This action adds a new usersUniversity';
  }

  findAll() {
    return `This action returns all usersUniversity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersUniversity`;
  }

  update(id: number, updateUsersUniversityDto: UpdateUsersUniversityDto) {
    return `This action updates a #${id} usersUniversity`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersUniversity`;
  }
}
