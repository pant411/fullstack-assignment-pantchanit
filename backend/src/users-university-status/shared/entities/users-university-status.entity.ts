import { UsersUniversity } from "src/users-university/shared/entities/users-university.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity({ name: 'users_university_status' })
export class UsersUniversityStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => UsersUniversity, (usersUniversity) => usersUniversity.usersUniversityStatus)
  usersUniversities: UsersUniversity[];
}
