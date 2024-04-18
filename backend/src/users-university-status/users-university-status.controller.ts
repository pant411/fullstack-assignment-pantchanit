import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UsersUniversityStatusService } from './users-university-status.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseModel } from 'src/shared/responses/resposne.interface';
import { UsersUniversityStatus } from './shared/entities/users-university-status.entity';

@Controller('api/v1/users-university-status')
@ApiTags('User University Status')
export class UsersUniversityStatusController {
  constructor(private readonly usersUniversityStatusService: UsersUniversityStatusService) {}

  @Get()
  async findAll(): Promise<ResponseModel<UsersUniversityStatus[]>> {
    const data = await this.usersUniversityStatusService.findAll();
    return {
      data,
      message: 'Found status',
      statusCode: HttpStatus.OK,
    };
  }

}
