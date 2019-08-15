import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Comment } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';
import { Idea } from '../idea/idea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Idea, Comment])],
  controllers: [UserController],
  providers: [UserService, UserResolver, CommentService],
})
export class UserModule {}
