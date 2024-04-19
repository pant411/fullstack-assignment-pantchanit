import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { GENDER } from '../enums/gender.enum';

@Entity({ name: 'users_admin' })
export class UserAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ name: 'email' })
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  constructor(partial: Partial<UserAdmin>) {
    Object.assign(this, partial);
  }
}
