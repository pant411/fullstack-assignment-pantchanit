import { Injectable } from '@nestjs/common';
import { UsersUniversityStatusRepository } from '../repositries/users-university-status.repository';
import { USERS_UNIVERSITY_STATUS } from '../enums/users-university-status.enum';

@Injectable()
export class UsersUniversityStatusSeederService {
  constructor(
    private readonly usersUniversityStatusRepository : UsersUniversityStatusRepository,
  ) {}

  async seedStatus() {
    const initialUser = this.usersUniversityStatusRepository.create([
      {
        id: 1,
        name: USERS_UNIVERSITY_STATUS.ACTIVE,
      },
      {
        id: 2,
        name: USERS_UNIVERSITY_STATUS.INACTIVE,
      },
      {
        id: 3,
        name: USERS_UNIVERSITY_STATUS.SUSPENDED,
      },
      {
        id: 4,
        name: USERS_UNIVERSITY_STATUS.LOCKED,
      },
      {
        id: 5,
        name: USERS_UNIVERSITY_STATUS.BANNED,
      },
    ]);

    await this.usersUniversityStatusRepository.save(initialUser);
  }
}
