import { Module } from '@nestjs/common';
import { UsersUniversityService } from './admin/users-university.service';
import { UsersUniversityController } from './admin/users-university.controller';
import { UsersUniversityRepository } from './shared/repositories/users-university.repository';
import { PaginationUserUniversityService } from './shared/paginations/services/pagination.service';

@Module({
  controllers: [UsersUniversityController],
  providers: [
    UsersUniversityService, 
    UsersUniversityRepository, 
    PaginationUserUniversityService,
  ],
})
export class UsersUniversityModule {}
