import { Injectable } from '@nestjs/common';
import { CreateUsersUniversityStatusDto } from './dto/create-users-university-status.dto';
import { UpdateUsersUniversityStatusDto } from './dto/update-users-university-status.dto';
import { UsersUniversityStatusRepository } from './shared/repositries/users-university-status.repository';

@Injectable()
export class UsersUniversityStatusService {
  constructor(private readonly usersUniversityStatusRepository: UsersUniversityStatusRepository) {}

  async findAll() {
    return await this.usersUniversityStatusRepository.find();
  }
}
