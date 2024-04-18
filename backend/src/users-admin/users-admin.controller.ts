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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/users-admin')
@ApiTags('Users Admin')
@ApiBearerAuth()
export class UserAdminController {
  constructor(private readonly userService: UserAdminService) { }

  @Get('me')
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
  async resetPassword(@Request() req: any, @Body() resetPasswordDto: ResetPasswordDto): Promise<ResponseModel> {
    // console.log(resetPasswordDto);
    // console.log(req.user);
    const id = req.user.id;
    // console.log(req.user);
    await this.userService.resetPassword(id, resetPasswordDto);    
    return {
      message: 'Reset Password successfully',
      statusCode: HttpStatus.CREATED,
    }
  }  

  @Patch(':id')
  async updateProfile(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<ResponseModel<UserAdmin>> {
    const data = await this.userService.updateProfile(id, updateUserDto);
    return {
      data,
      message: 'Update User successfully',
      statusCode: HttpStatus.CREATED,
    }
  }


}
