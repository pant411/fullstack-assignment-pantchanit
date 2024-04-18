import { Module, OnModuleInit } from '@nestjs/common';
import { UsersUniversityStatusService } from './users-university-status.service';
import { UsersUniversityStatusController } from './users-university-status.controller';
import { UsersUniversityStatusRepository } from './shared/repositries/users-university-status.repository';
import { UsersUniversityStatusSeederService } from './shared/seeders/users-university-status.seeder';

@Module({
  controllers: [UsersUniversityStatusController],
  providers: [
    UsersUniversityStatusService, 
    UsersUniversityStatusRepository,
    UsersUniversityStatusSeederService,
  ],
})
export class UsersUniversityStatusModule implements OnModuleInit {
  constructor(private readonly usersUniversityStatusSeederService: UsersUniversityStatusSeederService) {}

  async onModuleInit() {
    await this.usersUniversityStatusSeederService.seedStatus();
  }
}
