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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/auth/admin')
@ApiTags('Auth Admin')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  async register(@Body() registerDto: RegisterDto): Promise<ResponseModel> {
    const data = await this.authAdminService.register(registerDto);
    return {
      data,
      message: 'Register successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto): Promise<ResponseModel> {
    const data = await this.authAdminService.login(loginDto);
    return {
      data,
      message: 'Login successfully',
      statusCode: HttpStatus.CREATED,
    };
  }
}
