import { Module, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import BcryptService from 'src/auth/shared/services/bcrypt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAdmin } from 'src/users-admin/shared/entities/user-admin.entity';
import { UserAdminModule } from 'src/users-admin/users-admin.module';
import { JwtModule } from '@nestjs/jwt';
import { UserSeederService } from './shared/seeders/users/user.seeder';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get<number>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserAdmin]),
    UserAdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, UserSeederService],
  exports: [UserSeederService],
})
export class AuthModule {}
