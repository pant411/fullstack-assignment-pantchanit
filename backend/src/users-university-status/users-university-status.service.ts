import { Injectable } from '@nestjs/common';
import { CreateUsersUniversityStatusDto } from './dto/create-users-university-status.dto';
import { UpdateUsersUniversityStatusDto } from './dto/update-users-university-status.dto';

@Injectable()
export class UsersUniversityStatusService {
  create(createUsersUniversityStatusDto: CreateUsersUniversityStatusDto) {
    return 'This action adds a new usersUniversityStatus';
  }

  findAll() {
    return `This action returns all usersUniversityStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersUniversityStatus`;
  }

  update(id: number, updateUsersUniversityStatusDto: UpdateUsersUniversityStatusDto) {
    return `This action updates a #${id} usersUniversityStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersUniversityStatus`;
  }
}
