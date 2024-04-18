import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class BcryptService {
  constructor(private readonly configService: ConfigService) {}

  async generateHash(data: string): Promise<string> {
    const saltOrRounds = +this.configService.get<number>('SALT');
    return await bcrypt.hash(data, saltOrRounds);
  }

  async compareHash(data: string, encrypt: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypt);
  }
}
