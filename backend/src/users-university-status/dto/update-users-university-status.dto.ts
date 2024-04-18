import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersUniversityStatusDto } from './create-users-university-status.dto';

export class UpdateUsersUniversityStatusDto extends PartialType(CreateUsersUniversityStatusDto) {}
