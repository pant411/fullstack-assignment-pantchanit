import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersUniversityDto } from './dto/create-users-university.dto';
import { UpdateUsersUniversityDto } from './dto/update-users-university.dto';
import { UsersUniversityRepository } from '../shared/repositories/users-university.repository';
import { UsersUniversity } from '../shared/entities/users-university.entity';
import { PaginationUserUniversityService } from '../shared/paginations/services/pagination.service';
import { PaginationUserUniversityFilterDto } from '../shared/paginations/dtos/pagination.dto';
import { Like } from 'typeorm';

@Injectable()
export class UsersUniversityService {
  constructor(
    private readonly usersUniversityRepository: UsersUniversityRepository,
    private readonly paginationUserUniversityService: PaginationUserUniversityService
  ) {}

  async create(createUsersUniversityDto: CreateUsersUniversityDto): Promise<UsersUniversity> {
    const newUsersUniversity = this.usersUniversityRepository.create(createUsersUniversityDto);
    await this.usersUniversityRepository.save(newUsersUniversity);
    return newUsersUniversity;
  }

  async findAll(filter: PaginationUserUniversityFilterDto) {
    const where = {
      firstname: filter.firstname ? Like(`%${filter.firstname}%`) : undefined,
      lastname: filter.lastname ? Like(`%${filter.lastname}%`) : undefined,
      role: filter.role ? filter.role : undefined,
    };
    return await this.paginationUserUniversityService.paginate<UsersUniversity>(
      this.usersUniversityRepository,
      filter,
      where,
    );  }

  async findOne(id: number) {
    const data = await this.usersUniversityRepository.findOne({
      where: {id}
    });
    if (!data) {
      throw new NotFoundException(`Not found user id ${id}`)
    }
    return data;
  }

  update(id: number, updateUsersUniversityDto: UpdateUsersUniversityDto) {
    return `This action updates a #${id} usersUniversity`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersUniversity`;
  }
}
