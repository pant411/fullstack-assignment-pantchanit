import { DataSource, Repository } from 'typeorm';
import { UserAdmin } from '../entities/user-admin.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAdminRepository extends Repository<UserAdmin> {
  constructor(private dataSource: DataSource) {
    super(UserAdmin, dataSource.createEntityManager());
  }
  async findOneByEmail(email: string): Promise<UserAdmin> {
    return await this.findOne({ where: { email } });
  }
}
