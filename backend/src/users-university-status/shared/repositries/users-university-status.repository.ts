import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UsersUniversityStatus } from '../entities/users-university-status.entity';

@Injectable()
export class UsersUniversityStatusRepository extends Repository<UsersUniversityStatus> {
  constructor(private dataSource: DataSource) {
    super(UsersUniversityStatus, dataSource.createEntityManager());
  }
}
