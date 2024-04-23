import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { GENDER } from 'src/users-admin/shared/enums/gender.enum';
import { ROLE_USER_UNIVERSITY } from '../enums/role-user-university.enum';
import { UsersUniversityStatus } from 'src/users-university-status/shared/entities/users-university-status.entity';

@Entity({ name: 'users_university' })
export class UsersUniversity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'datetime', name: 'dob' })
  DOB: Date; // dateOfBirth

  @Column({
    type: 'enum',
    enum: GENDER,
    default: GENDER.NOT_SPECIFIED,
    nullable: true,
  })
  gender: GENDER;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'sub_district' })
  subDistrict: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'province' })
  province: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column({
    type: 'enum',
    enum: ROLE_USER_UNIVERSITY,
  })
  role: ROLE_USER_UNIVERSITY;

  @Column({ name: 'status_id' })
  statusId: number;
  @ManyToOne(() => UsersUniversityStatus, (usersUniversityStatus) => usersUniversityStatus.usersUniversities)
  @JoinColumn({name: 'status_id'})
  usersUniversityStatus: UsersUniversityStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  constructor(partial: Partial<UsersUniversity>) {
    Object.assign(this, partial);
  }
}
