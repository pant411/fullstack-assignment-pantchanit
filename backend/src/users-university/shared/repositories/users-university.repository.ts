import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UsersUniversity } from '../entities/users-university.entity';

@Injectable()
export class UsersUniversityRepository extends Repository<UsersUniversity> {
  constructor(private dataSource: DataSource) {
    super(UsersUniversity, dataSource.createEntityManager());
  }
}
