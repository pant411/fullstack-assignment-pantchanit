import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UsersUniversityStatusService } from './users-university-status.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseModel } from 'src/shared/responses/resposne.interface';
import { UsersUniversityStatus } from './shared/entities/users-university-status.entity';

@Controller('api/v1/users-university-status')
@ApiTags('User University Status')
export class UsersUniversityStatusController {
  constructor(private readonly usersUniversityStatusService: UsersUniversityStatusService) { }

  @Get()
  @ApiOperation({ summary: 'รายชื่อสถานะของสมาชิก university' })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'Found status',
    schema: {
      example: {
        data: [{
          id: 1,
          name: "Active",
          description: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }],
        message: 'Found status',
        statusCode: HttpStatus.OK,
      },
    },
  })
  async findAll(): Promise<ResponseModel<UsersUniversityStatus[]>> {
    const data = await this.usersUniversityStatusService.findAll();
    return {
      data,
      message: 'Found status',
      statusCode: HttpStatus.OK,
    };
  }

}
