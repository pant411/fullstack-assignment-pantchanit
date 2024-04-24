import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { ResponseModel } from 'src/shared/responses/resposne.interface';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAdmin } from 'src/users-admin/shared/entities/user-admin.entity';
import { GENDER } from 'src/users-admin/shared/enums/gender.enum';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/auth/admin')
@ApiTags('Auth Admin')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) { }

  @Post('register')
  @ApiOperation({ summary: 'สมัครสมาชิกประเภท admin เพื่อเข้าใช้งานระบบ' })
  @ApiBody({ type: RegisterDto }) 
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Register successfully',
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
          deletedAt: new Date(),
        },
        message: 'Register successfully',
        statusCode: HttpStatus.CREATED,
      },
    },
  })
  async register(@Body() registerDto: RegisterDto): Promise<ResponseModel> {
    const data = await this.authAdminService.register(registerDto);
    return {
      data,
      message: 'Register successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'การเข้าสู้ระบบของสมาชิกประเภท admin' })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Login successfully',
    schema: {
      example: {
        data: {
          accessToken: "Bearer ${someToken}",
        },
        message: 'Login successfully',
        statusCode: HttpStatus.CREATED,
      },
    },
  })
  async login(@Body() loginDto: LoginDto): Promise<ResponseModel> {
    const data = await this.authAdminService.login(loginDto);
    return {
      data,
      message: 'Login successfully',
      statusCode: HttpStatus.CREATED,
    };
  }
}
