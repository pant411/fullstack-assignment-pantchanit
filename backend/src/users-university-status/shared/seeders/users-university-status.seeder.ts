import { Injectable } from '@nestjs/common';
import { UsersUniversityStatusRepository } from '../repositries/users-university-status.repository';
import { USERS_UNIVERSITY_STATUS, USERS_UNIVERSITY_STATUS_ID } from '../enums/users-university-status.enum';

@Injectable()
export class UsersUniversityStatusSeederService {
  constructor(
    private readonly usersUniversityStatusRepository : UsersUniversityStatusRepository,
  ) {}

  async seedStatus() {
    const initialUser = this.usersUniversityStatusRepository.create([
      {
        id: USERS_UNIVERSITY_STATUS_ID.ACTIVE,
        name: USERS_UNIVERSITY_STATUS.ACTIVE,
      },
      {
        id: USERS_UNIVERSITY_STATUS_ID.INACTIVE,
        name: USERS_UNIVERSITY_STATUS.INACTIVE,
      },
      {
        id: USERS_UNIVERSITY_STATUS_ID.SUSPENDED,
        name: USERS_UNIVERSITY_STATUS.SUSPENDED,
      },
      {
        id: USERS_UNIVERSITY_STATUS_ID.LOCKED,
        name: USERS_UNIVERSITY_STATUS.LOCKED,
      },
      {
        id: USERS_UNIVERSITY_STATUS_ID.BANNED,
        name: USERS_UNIVERSITY_STATUS.BANNED,
      },
    ]);

    await this.usersUniversityStatusRepository.save(initialUser);
  }
}
