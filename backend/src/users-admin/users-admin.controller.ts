import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UserAdminService } from './users-admin.service';
import { ResponseModel } from 'src/shared/responses/resposne.interface';
import { ResetPasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { UserAdmin } from './shared/entities/user-admin.entity';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/admin/users')
@ApiTags('Users Admin')
@ApiBearerAuth()
export class UserAdminController {
  constructor(private readonly userService: UserAdminService) { }
  
  @Get('me')
  @ApiOperation({ summary: 'ข้อมูลโปรไฟล์ของผู้ใช้งานระบบนี้' })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'Found user profile',
    schema: {
      example: {
        data: {
          id: 1,
          firstname: "string",
          lastname: "string",
          email: "string",
          DOB: new Date(),
          gender: "Male or Female or Not specified",
          phoneNumber: "string",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        message: 'Found user profile',
        statusCode: HttpStatus.OK,
      },
    },
  })
  async getProfile(@Request() req: any): Promise<ResponseModel> {
    const userId = req.user.id;
    const data = await this.userService.findOne(userId);
    return {
      data,
      message: 'Found User',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('reset-password')
  @ApiBody({ type: ResetPasswordDto })
  @ApiOperation({ summary: 'เปลี่ยนรหัสผ่านของผู้ใช้งานระบบนี้' })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'Reset Password successfully',
    schema: {
      example: {
        message: 'Reset Password successfully',
        statusCode: HttpStatus.OK,
      },
    },
  })
  async resetPassword(@Request() req: any, @Body() resetPasswordDto: ResetPasswordDto): Promise<ResponseModel> {
    // console.log(resetPasswordDto);
    // console.log(req.user);
    const id = req.user.id;
    // console.log(req.user);
    await this.userService.resetPassword(id, resetPasswordDto);    
    return {
      message: 'Reset Password successfully',
      statusCode: HttpStatus.OK,
    }
  }  

  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขโปรไฟล์ของผู้ใช้งานระบบนี้' })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'Update user successfully',
    schema: {
      example: {
        data: {
          id: 1,
          firstname: "string",
          lastname: "string",
          email: "string",
          DOB: new Date(),
          gender: "Male or Female or Not specified",
          phoneNumber: "string",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        message: 'Update user successfully',
        statusCode: HttpStatus.OK,
      },
    },
  })
  async updateProfile(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<ResponseModel<UserAdmin>> {
    const data = await this.userService.updateProfile(id, updateUserDto);
    return {
      data,
      message: 'Update user successfully',
      statusCode: HttpStatus.OK,
    }
  }
}
