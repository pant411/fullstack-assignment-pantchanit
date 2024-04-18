import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import BcryptService from '../shared/services/bcrypt.service';
import { UserAdminRepository } from 'src/users-admin/shared/repositories/user-admin.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly userAdminRepository: UserAdminRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existUser = await this.userAdminRepository.findOneByEmail(
      registerDto.email,
    );
    if (existUser) {
      throw new ConflictException('User exists.');
    }
    const hashPassword = await this.bcryptService.generateHash(
      registerDto.password,
    );
    const newUser = this.userAdminRepository.create({
      ...registerDto,
      password: hashPassword,
    });
    return await this.userAdminRepository.save(newUser);
  }

  async login(loginDto: LoginDto) {
    const existUser = await this.userAdminRepository.findOneByEmail(loginDto.email);
    // console.log(existUser);
    if (!existUser) {
      throw new BadRequestException(`User doesn't exist.`);
    }
    const isMatch = await this.bcryptService.compareHash(
      loginDto.password,
      existUser.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Password is wrong.');
    }
    const payload = {
      id: existUser.id,
      email: existUser.email,
      firstname: existUser.firstname,
      lastname: existUser.lastname,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
