import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Idea } from '../idea/idea.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column('text')
  comment: string;

  @ManyToOne(type => User)
  @JoinTable()
  author: User;

  @ManyToOne(type => Idea, idea => idea.comments)
  idea: Idea;
}
