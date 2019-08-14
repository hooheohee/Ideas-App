import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Idea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('text')
  idea: string;

  @Column('text')
  description: string;

  @ManyToOne(type => User, author => author.ideas)
  author: User;

  @ManyToMany(type => User, { cascade: true })
  @JoinTable()
  upvotes: User[];

  @ManyToMany(type => User, { cascade: true })
  @JoinTable()
  downvotes: User[];

  @OneToMany(type => Comment, comment => comment.idea, { cascade: true })
  comments: Comment[];
}
