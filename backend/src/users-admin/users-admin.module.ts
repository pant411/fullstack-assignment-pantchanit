import { Module } from '@nestjs/common';
import { UserAdminService } from './users-admin.service';
import { UserAdminController } from './users-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAdmin } from './shared/entities/user-admin.entity';
import { UserAdminRepository } from './shared/repositories/user-admin.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import BcryptService from 'src/auth/shared/services/bcrypt.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserAdmin]), JwtModule],
  controllers: [UserAdminController],
  providers: [UserAdminService, UserAdminRepository, BcryptService],
  exports: [UserAdminRepository],
})
export class UserAdminModule {}
