import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('resumes')
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column('text')
  content: string; //parsed resume text

  @CreateDateColumn()
  uploadedAt: Date;

  @ManyToOne(() => User, (user) => user.resumes, { onDelete: 'CASCADE' })
  user: User;
}
