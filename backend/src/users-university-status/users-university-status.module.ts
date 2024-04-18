import { Module } from '@nestjs/common';
import { UsersUniversityStatusService } from './users-university-status.service';
import { UsersUniversityStatusController } from './users-university-status.controller';

@Module({
  controllers: [UsersUniversityStatusController],
  providers: [UsersUniversityStatusService],
})
export class UsersUniversityStatusModule {}
