import { Idea } from './../idea/idea.entity';
import { Comment } from './../comment/comment.entity';
import { UserRO } from './user.dto';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @OneToMany(type => Idea, idea => idea.author)
  ideas: Idea[];

  @ManyToMany(type => Idea, { cascade: true })
  @JoinTable()
  bookmarks: Idea[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true) {
    const { id, created, username, token, ideas, bookmarks } = this;
    const responseObject: UserRO = { id, created, username, ideas, bookmarks };
    if (showToken) {
      responseObject.token = token;
    }
    if (this.ideas) {
      responseObject.ideas = this.ideas;
    }
    if (this.bookmarks) {
      responseObject.bookmarks = this.bookmarks;
    }
    return responseObject;
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
