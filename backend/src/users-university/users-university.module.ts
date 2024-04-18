import { Module } from '@nestjs/common';
import { UsersUniversityService } from './users-university.service';
import { UsersUniversityController } from './users-university.controller';

@Module({
  controllers: [UsersUniversityController],
  providers: [UsersUniversityService],
})
export class UsersUniversityModule {}
