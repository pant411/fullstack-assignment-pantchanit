import { Module } from '@nestjs/common';
import { UsersUniversityService } from './admin/users-university.service';
import { UsersUniversityController } from './admin/users-university.controller';
import { UsersUniversityRepository } from './shared/repositories/users-university.repository';
import { PaginationUserUniversityService } from './shared/paginations/services/pagination.service';
import BcryptService from 'src/auth/shared/services/bcrypt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [UsersUniversityController],
  providers: [
    UsersUniversityService, 
    UsersUniversityRepository, 
    PaginationUserUniversityService,
    BcryptService,
  ],
})
export class UsersUniversityModule {}
