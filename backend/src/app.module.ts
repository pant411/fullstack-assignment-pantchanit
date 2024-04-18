import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserAdminModule } from './users-admin/users-admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationAdminMiddleware } from './shared/middlewares/authentication-admin.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationMiddleware } from './shared/middlewares/authentication.middleware';
import { UsersUniversityModule } from './users-university/users-university.module';
import { UsersUniversityStatusModule } from './users-university-status/users-university-status.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserAdminModule,
    JwtModule,
    UsersUniversityModule,
    UsersUniversityStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationAdminMiddleware).forRoutes('api/v1/admin/*', 'api/v1/users-admin/*');
  }
}
