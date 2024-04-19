import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersUniversityDto } from './dto/create-users-university.dto';
import { UpdateUsersUniversityDto } from './dto/update-users-university.dto';
import { UsersUniversityRepository } from '../shared/repositories/users-university.repository';
import { UsersUniversity } from '../shared/entities/users-university.entity';
import { PaginationUserUniversityService } from '../shared/paginations/services/pagination.service';
import { PaginationUserUniversityFilterDto } from '../shared/paginations/dtos/pagination.dto';
import { Like } from 'typeorm';
import { PaginationResponse } from 'src/shared/responses/pagination.response';
import BcryptService from 'src/auth/shared/services/bcrypt.service';

@Injectable()
export class UsersUniversityService {
  constructor(
    private readonly usersUniversityRepository: UsersUniversityRepository,
    private readonly paginationUserUniversityService: PaginationUserUniversityService,
    private readonly bcryptService: BcryptService,
  ) { }

  async create(createUsersUniversityDto: CreateUsersUniversityDto): Promise<UsersUniversity> {
    const existUser = await this.usersUniversityRepository.findOneByEmail(
      createUsersUniversityDto.email,
    );
    if (existUser) {
      throw new ConflictException('User exists.');
    }
    const hashPassword = await this.bcryptService.generateHash(
      createUsersUniversityDto.password,
    );
    const newUsersUniversity = this.usersUniversityRepository.create({ 
      ...createUsersUniversityDto, 
      password: hashPassword 
    });
    await this.usersUniversityRepository.save(newUsersUniversity);
    return newUsersUniversity;
  }

  async findAll(filter: PaginationUserUniversityFilterDto): Promise<PaginationResponse<UsersUniversity>> {
    const where = {
      firstname: filter.firstname ? Like(`%${filter.firstname}%`) : undefined,
      lastname: filter.lastname ? Like(`%${filter.lastname}%`) : undefined,
      role: filter.role ? filter.role : undefined,
    };
    return await this.paginationUserUniversityService.paginate<UsersUniversity>(
      this.usersUniversityRepository,
      filter,
      where,
    );
  }

  async findOne(id: number): Promise<UsersUniversity> {
    const data = await this.usersUniversityRepository.findOne({
      where: { id }
    });
    if (!data) {
      throw new NotFoundException(`Not found user id ${id}`)
    }
    return data;
  }

  async update(id: number, updateUsersUniversityDto: UpdateUsersUniversityDto): Promise<UsersUniversity> {
    const existUser = await this.usersUniversityRepository.findOneBy({ id });
    if (!existUser) {
      throw new BadRequestException(`User id ${id} doesn't exist.`)
    }
    await this.usersUniversityRepository.update(id, updateUsersUniversityDto);
    return await this.usersUniversityRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const existUser = await this.usersUniversityRepository.findOneBy({ id });
    if (!existUser) {
      throw new BadRequestException(`User id ${id} doesn't exist.`)
    }
    await this.usersUniversityRepository.softDelete(id);
  }
}
