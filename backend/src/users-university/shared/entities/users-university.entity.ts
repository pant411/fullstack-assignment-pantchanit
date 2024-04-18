import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { GENDER } from 'src/users-admin/shared/enums/gender.enum';
import { ROLE_USER_UNIVERSITY } from '../enums/role-user-university.enum';
import { UsersUniversityStatus } from 'src/users-university-status/shared/entities/users-university-status.entity';

@Entity({ name: 'users_admin' })
export class UsersUniversity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ nullable: true })
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

  @Column({ name: 'country' })
  country: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column({
    type: 'enum',
    enum: ROLE_USER_UNIVERSITY,
  })
  role: ROLE_USER_UNIVERSITY;

  @Column()
  statusId: number;
  @ManyToOne(() => UsersUniversityStatus, (usersUniversityStatus) => usersUniversityStatus.usersUniversities)
  usersUniversityStatus: UsersUniversityStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<UsersUniversity>) {
    Object.assign(this, partial);
  }
}
