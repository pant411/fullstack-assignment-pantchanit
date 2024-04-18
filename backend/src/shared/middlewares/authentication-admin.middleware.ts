import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '@nestjs/common'; // Update import
import { ForbiddenException } from '@nestjs/common'; // Add this import
import { ROLE } from 'src/users-admin/shared/enums/role.enum';

@Injectable()
export class AuthenticationAdminMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      // console.log(decoded);
      if (decoded['role'] !== ROLE.ADMIN) {
        throw new UnauthorizedException(
          'You do not have permission to access this resource',
        );
      }
      req['user'] = decoded;
      next();
    } catch (error) {
      // console.log(error);
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Token has expired');
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      throw error; // rethrow other errors
    }
  }
}
