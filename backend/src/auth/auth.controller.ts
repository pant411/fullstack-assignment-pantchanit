import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { ResponseModel } from 'src/shared/responses/resposne.interface';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/auth/admin')
@ApiTags('Auth Admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ResponseModel> {
    const data = await this.authService.register(registerDto);
    return {
      data,
      message: 'Register successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseModel> {
    const data = await this.authService.login(loginDto);
    return {
      data,
      message: 'Login successfully',
      statusCode: HttpStatus.CREATED,
    };
  }
}
