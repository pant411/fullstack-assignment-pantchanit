import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersUniversityService } from './users-university.service';
import { CreateUsersUniversityDto } from './dto/create-users-university.dto';
import { UpdateUsersUniversityDto } from './dto/update-users-university.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseModel } from 'src/shared/responses/resposne.interface';
import { UsersUniversity } from '../shared/entities/users-university.entity';
import { PaginationUserUniversityFilterDto } from '../shared/paginations/dtos/pagination.dto';
import { PaginationResponse } from 'src/shared/responses/pagination.response';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/admin/users-university')
@ApiTags('User University')
@ApiBearerAuth()
export class UsersUniversityController {
  constructor(private readonly usersUniversityService: UsersUniversityService) { }

  @Post()
  @ApiOperation({ summary: 'เพิ่มสมาชิกของ university' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Create user of university successfully',
    schema: {
      example: {
        data: {
          id: 1,
          firstname: "string",
          lastname: "string",
          email: "string",
          DOB: new Date(),
          gender: "string",
          phoneNumber: "string",
          address: "string",
          subDistrict: "string",
          city: "string",
          province: "string",
          zipCode: "string",
          role: "string",
          statusId: 2,
        },
        message: 'Create user of university successfully',
        statusCode: HttpStatus.CREATED,
      },
    },
  })
  async create(@Body() createUsersUniversityDto: CreateUsersUniversityDto):
    Promise<ResponseModel<UsersUniversity>> {
    const data = await this.usersUniversityService.create(createUsersUniversityDto);
    return {
      data,
      message: 'Create user of university successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  @ApiOperation({ summary: 'รายชื่อสมาชิกของ university' })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'Found List user of university successfully',
    schema: {
      example: {
        data: {
          "items": [{
            id: 1,
            firstname: "string",
            lastname: "string",
            email: "string",
            DOB: new Date(),
            gender: "string",
            phoneNumber: "string",
            address: "string",
            subDistrict: "string",
            city: "string",
            province: "string",
            zipCode: "string",
            role: "string",
            statusId: 2,
          }],
          "pageMeta": {
            "page": 1,
            "totalPage": 1,
            "totalItemInPage": 1,
            "totalItem":1,
            "hasPreviousPage": false,
            "hasNextPage": false
          },
        },
        message: 'Found List user of university successfully',
        statusCode: HttpStatus.OK,
      },
    },
  })
  async findAll(@Query() filter: PaginationUserUniversityFilterDto):
    Promise<ResponseModel<PaginationResponse<UsersUniversity>>> {
    const data = await this.usersUniversityService.findAll(filter);
    return {
      data,
      message: data.items.length > 0 ?
        'Found List user of university successfully' :
        'Not Found List user of university successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'สมาชิกของ university ของ id ต่างๆ' })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'Found user of university successfully',
    schema: {
      example: {
        data: {
          id: 1,
          firstname: "string",
          lastname: "string",
          email: "string",
          DOB: new Date(),
          gender: "string",
          phoneNumber: "string",
          address: "string",
          subDistrict: "string",
          city: "string",
          province: "string",
          zipCode: "string",
          role: "string",
          statusId: 2,
        },
        message: 'Found user of university successfully',
        statusCode: HttpStatus.OK,
      },
    },
  })
  async findOne(@Param('id') id: string): Promise<ResponseModel<UsersUniversity>> {
    const data = await this.usersUniversityService.findOne(+id);
    return {
      data,
      message: 'Found user of university successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขข้อมูลสมาชิกของ university ของ id ต่างๆ' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Update user of university successfully',
    schema: {
      example: {
        data: {
          id: 1,
          firstname: "string",
          lastname: "string",
          email: "string",
          DOB: new Date(),
          gender: "string",
          phoneNumber: "string",
          address: "string",
          subDistrict: "string",
          city: "string",
          province: "string",
          zipCode: "string",
          role: "string",
          statusId: 2,
        },
        message: 'Update user of university successfully',
        statusCode: HttpStatus.CREATED,
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateUsersUniversityDto: UpdateUsersUniversityDto):
    Promise<ResponseModel<UsersUniversity>> {
    const data = await this.usersUniversityService.update(+id, updateUsersUniversityDto);
    return {
      data,
      message: 'Update user of university successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบสมาชิกของ university ที่ id ต่างๆ' })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'Delete user of university successfully',
    schema: {
      example: {
        message: 'Delete user of university successfully',
        statusCode: HttpStatus.OK,
      },
    },
  })
  async remove(@Param('id') id: string): Promise<ResponseModel> {
    await this.usersUniversityService.remove(+id);
    return {
      message: 'Delete user of university successfully',
      statusCode: HttpStatus.OK,
    }
  }
}
