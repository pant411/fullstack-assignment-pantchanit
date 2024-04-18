import { Injectable } from '@nestjs/common';
import BcryptService from 'src/auth/shared/services/bcrypt.service';
import { ROLE } from 'src/users-admin/shared/enums/role.enum';
import { UserAdminRepository } from '../../../../users-admin/shared/repositories/user-admin.repository';

@Injectable()
export class UserSeederService {
  constructor(
    private readonly userAdminRepository: UserAdminRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async seedUsers() {
    const initialUser = this.userAdminRepository.create([
      {
        id: 1,
        firstname: 'Admin',
        lastname: 'Admin',
        phoneNumber: '0123456789',
        email: 'admin@company.com',
        password: await this.bcryptService.generateHash('!dacmvwv154'),
        DOB: '2000-03-12',
      },
    ]);

    await this.userAdminRepository.save(initialUser);
  }
}
