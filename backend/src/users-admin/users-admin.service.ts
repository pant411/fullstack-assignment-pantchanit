import { BadRequestException, Injectable } from '@nestjs/common';
import { UserAdminRepository } from './shared/repositories/user-admin.repository';
import { UserAdmin } from './shared/entities/user-admin.entity';
import { ResetPasswordDto, UpdateUserDto } from './dto/update-user.dto';
import BcryptService from 'src/auth/shared/services/bcrypt.service';

@Injectable()
export class UserAdminService {
  constructor(
    private readonly userAdminRepository: UserAdminRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async findOne(id: number): Promise<UserAdmin> {
    return await this.userAdminRepository.findOne({ where: { id } });
  }

  async updateProfile(id: number, updateUserDto: UpdateUserDto): Promise<UserAdmin> {
    const existUser = await this.userAdminRepository.findOne({ where: { id } });
    if (!existUser) {
      throw new BadRequestException(`User id #{id} doesn't exits`);
    }
    await this.userAdminRepository.update(id, updateUserDto);
    return await this.userAdminRepository.findOne({ where: { id } });
  }

  async resetPassword(id: number, resetPasswordDto: ResetPasswordDto) {
    const existUser = await this.userAdminRepository.findOne({ where: { id } });
    if (!existUser) {
      throw new BadRequestException(`User id #{id} doesn't exits`);
    }
    const hashOldPassword = existUser.password;
    const isMatch = await this.bcryptService.compareHash(
      resetPasswordDto.oldPassword,
      hashOldPassword,
    );
    if (!isMatch) {
      throw new BadRequestException('Your password is wrong.');
    }
    const newPassword = await this.bcryptService.generateHash(
      resetPasswordDto.newPassword,
    );
    await this.userAdminRepository.update(id, {
      password: newPassword,
    });
  }
}
