import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersUniversityDto } from './create-users-university.dto';

export class UpdateUsersUniversityDto extends PartialType(CreateUsersUniversityDto) {}
